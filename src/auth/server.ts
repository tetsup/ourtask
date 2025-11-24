import { NextRequest } from 'next/server';
import { betterAuth } from 'better-auth';
import { customSession } from 'better-auth/plugins';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { database, withTransaction } from '@/db/setup';
import { UserSetting } from '@/db/params/userSetting';

export const auth = betterAuth({
  database: mongodbAdapter(database()),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: 'Users',
  },
  session: { modelName: 'UserSessions' },
  account: { modelName: 'UserAccounts' },
  plugins: [
    customSession(async ({ user }) => {
      const { id, ...newUser } = user;
      const baseUser = { _id: id, ...newUser };
      const userSetting = await withTransaction(
        async ({ db, session }) =>
          await db
            .collection(UserSetting.collectionName)
            .findOne({ userId: id }, { session })
      );
      return {
        ...baseUser,
        setting: userSetting,
      };
    }),
  ],
});

export const getSignInUser = async (req: NextRequest) => {
  const session = await auth.api.getSession(req);
  return session;
};
