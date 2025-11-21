import { DbExecute } from '../func';
import { UserSetting } from '../params/userSetting';

export const getUserSetting: DbExecute<any> = async ({
  params,
  sessionSet: { db, session },
}) =>
  await db
    .collection(UserSetting.collectionName)
    .findOne({ user: params.user }, { session });
