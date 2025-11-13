'use server';
import z from 'zod';
import { NextRequest } from 'next/server';
import { api, needLogin, Validation } from '../func';
import { collection, withTransaction } from '../setup';

const apiGetListValidation: Validation<any> = {
  schema: z.object({ q: z.string() }),
  schemaAsync: () => z.any(),
  permission: needLogin,
};

export const apiGetList = async (req: NextRequest) =>
  await withTransaction(
    async (session) =>
      await api({
        req,
        session,
        validation: apiGetListValidation,
        execute: async ({ params, session }) =>
          await collection('user')
            .find(
              {
                $or: [
                  { name: { contains: params.q } },
                  { email: { contains: params.q } },
                ],
              },
              { session }
            )
            .project({ _id: 1, name: 1, email: 1, lang: 1, avatar: 1 })
            .limit(10)
            .toArray(),
      })
  );
