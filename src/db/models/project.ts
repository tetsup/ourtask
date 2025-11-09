'use server';
import z from 'zod';
import { NextRequest } from 'next/server';
import { api, needLogin, Validation } from '../func';
import { projectSchema } from '../schemas/project';
import { collection, withTransaction } from '../setup';

type Project = z.infer<typeof projectSchema>;
type PostParams = { data: Project };

const apiGetListValidation: Validation<any> = {
  schema: z.any(),
  schemaAsync: () => z.any(),
  permission: needLogin,
};
const apiPostValidation: Validation<PostParams> = {
  schema: z.object({ data: projectSchema }),
  schemaAsync: () => z.any(),
  permission: async ({ authInfo, params }) => {
    params.data.ownerIds.some((ownerId) => ownerId.equals(authInfo?.user.id));
  },
};

export const apiGetList = async (req: NextRequest) =>
  await withTransaction(
    async (session) =>
      await api({
        req,
        session,
        validation: apiGetListValidation,
        execute: async ({ session, authInfo }) =>
          await collection('Projects')
            .find(
              {
                $or: [
                  {
                    ownerIds: { $in: [authInfo?.user.id] },
                  },
                  { 'assignees.userId': { $in: [authInfo?.user.id] } },
                ],
              },
              { session }
            )
            .toArray(),
      })
  );
export const apiPost = async (req: NextRequest) =>
  await withTransaction(
    async (session) =>
      await api({
        req,
        session,
        validation: apiPostValidation,
        execute: async ({ params: { data }, session }) =>
          await collection('Projects').insertOne(data, {
            session,
          }),
      })
  );
