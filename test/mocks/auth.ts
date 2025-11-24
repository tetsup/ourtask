import { ObjectId } from 'mongodb';
import { User } from '@/db/params/user';
import { withSession } from '@/db/setup';
import type { User as UserType } from '@/db/types/user';

export const dummySignInUser = async (userId: ObjectId): Promise<UserType> => {
  const user = await withSession(({ db, session }) =>
    db.collection(User.collectionName).findOne({ _id: userId }, { session })
  );
  return { ...user, setting: {} };
};
