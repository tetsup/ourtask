import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { withTransaction } from '@/db/setup';
import { apiPost } from '@/db/models/project';
import { Project } from '@/db/params/project';
import { auth } from '@/auth/server';
import { ProjectFactory } from '../../factories/project.factory';
import { createDummyUsersInDb } from '../../factories/user.factory';
import { dummySignInUser } from '../../mocks/auth';

describe('postProject', () => {
  let userIds: ObjectId[];
  beforeEach(async () => {
    userIds = await createDummyUsersInDb(5);
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
      .mockResolvedValue(dummySignInUser(userIds[0]));
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
        await db
          .collection(Project.collectionName)
          .find({}, { session })
          .toArray()
    );
    expect(inserted).toHaveLength(1);
    expect(inserted[0]).toEqual({
      ...project,
      _id: new ObjectId(resBody.insertedId as string),
    });
  });
});
