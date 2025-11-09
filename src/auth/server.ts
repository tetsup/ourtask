import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { database } from '@/db/setup';

export const auth = betterAuth({
  database: mongodbAdapter(database()),
  emailAndPassword: {
    enabled: true,
  },
});
