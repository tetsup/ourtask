'use server';
import { NextRequest } from 'next/server';
import { withTransaction } from '@/db/setup';
import { api, needLogin } from '@/db/func';
import { User } from '@/db/params/user';
import { queryWordSchema } from '../schemas/common';

export const apiGetList = async (req: NextRequest) =>
  await withTransaction(
    async (sessionSet) =>
      await api({
        req,
        sessionSet,
        schema: queryWordSchema,
        authorize: needLogin,
        execute: async ({ params, sessionSet: { db, session } }) =>
          await db
            .collection(User.collectionName)
            .find(
              {
                $or: [
                  { name: { $regex: params.word } },
                  { email: { $regex: params.word } },
                ],
              },
              { session }
            )
            .project({ _id: 1, name: 1, email: 1 })
            .limit(10)
            .toArray(),
      })
  );
