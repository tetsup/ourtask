import { ObjectId } from 'mongodb';
import { AuthInfo } from '@/db/func';
import { User } from '@/db/params/user';
import { withSession } from '@/db/setup';

export const dummyAuthInfo = async (userId: ObjectId): Promise<AuthInfo> => {
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
