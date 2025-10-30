import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { mongoDatabase } from '@/db/setup';

export const auth = betterAuth({
  database: mongodbAdapter(mongoDatabase()),
  emailAndPassword: {
    enabled: true,
  },
});
