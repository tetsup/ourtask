'use server';
import z from 'zod';
import { NextRequest } from 'next/server';
import { Document } from 'mongodb';
import { api, DbExecuteParams, needLogin, Validation } from '../func';
import { projectSchema } from '../schemas/server/project';
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
const apiGetListAggregater = ({
  authInfo,
}: DbExecuteParams<any>): Document[] => [
  {
    $match: {
      $or: [
        {
          ownerIds: { $in: [authInfo?.user.id] },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'Users',
      localField: 'ownerIds',
      foreignField: '_id',
      as: 'owners',
    },
  },
  {
    $lookup: {
      from: 'Users',
      localField: 'assignees.userId',
      foreignField: '_id',
      as: 'assignees.user',
    },
  },
];
export const apiGetList = async (req: NextRequest) =>
  await withTransaction(
    async (session) =>
      await api({
        req,
        session,
        validation: apiGetListValidation,
        execute: async (params) =>
          await collection('Projects')
            .aggregate(apiGetListAggregater(params), { session })
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
