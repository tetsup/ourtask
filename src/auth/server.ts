import { betterAuth } from 'better-auth';
import { customSession } from 'better-auth/plugins';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { database, withTransaction } from '@/db/setup';
import { getUserSetting } from '@/db/models/userSetting';

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
    customSession(async ({ user, session }) => {
      const userOptions = await withTransaction(async (sessionSet) => {
        await getUserSetting({
          params: { user: { _id: user.id } },
          authInfo: { user, session },
          sessionSet,
        });
      });
      return {
        user: {
          ...user,
          ...userOptions,
        },
        session,
      };
    }),
  ],
});
