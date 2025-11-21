import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { withSession, withTransaction } from '@/db/setup';
import { apiPost } from '@/db/models/project';
import { UserFactory } from '../../factories/user.factory';
import { ProjectFactory } from '../../factories/project.factory';
import { Project } from '@/db/params/project';
import { auth } from '@/auth/server';
import { User } from '@/db/params/user';
import { AuthInfo } from '@/db/func';

const createUser = async (params?: any) => {
  const user = new UserFactory(params).build();
  const { insertedId: userId } = await withSession(({ db }) =>
    db.collection('Users').insertOne(user)
  );
  return userId;
};

const dummyAuthInfo = async (userId: ObjectId): Promise<AuthInfo> => {
  const { _id, ...user } = await withSession(({ db, session }) =>
    db.collection(User.collectionName).findOne({ _id: userId }, { session })
  );
  return {
    user: { ...user, id: _id.toString() },
    session: {
      id: new ObjectId().toString(),
      userId: userId.toString(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      expiresAt: user.expiresAt,
      token: '',
    },
  };
};

describe('postProject', () => {
  let userIds: ObjectId[];
  beforeEach(async () => {
    userIds = [...Array(10)].map(() => new ObjectId());
    await Promise.all(userIds.map((_id) => createUser({ _id })));
  });
  test('unauthorized', async () => {
    jest.spyOn(auth.api, 'getSession').mockResolvedValue(null);
    const project = new ProjectFactory({
      owners: [{ _id: userIds[0].toString() }],
    }).build();
    const res = await apiPost(
      new NextRequest('http://localhost:3000/api/project', {
        method: 'POST',
        body: JSON.stringify(project),
      })
    );
    expect(res.ok).toBeFalsy();
    expect(res.status).toEqual(401);
  });
  test('inserted', async () => {
    jest
      .spyOn(auth.api, 'getSession')
      .mockResolvedValue(await dummyAuthInfo(userIds[0]));
    const project = new ProjectFactory({
      owners: [{ _id: userIds[0] }],
    }).build();
    const res = await apiPost(
      new NextRequest('http://localhost:3000/api/project', {
        method: 'POST',
        body: JSON.stringify(project),
      })
    );
    expect(res.ok).toBeTruthy();
    const resBody = await res.json();
    const inserted = await withTransaction(
      async ({ db, session }) =>
        await db.collection(Project.collectionName).findOne({}, { session })
    );
    expect(inserted).toEqual({
      ...project,
      _id: new ObjectId(resBody.insertedId as string),
    });
  });
});
