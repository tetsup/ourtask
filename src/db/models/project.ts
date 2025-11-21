'use server';
import { NextRequest } from 'next/server';
import { Document } from 'mongodb';
import { withTransaction } from '@/db/setup';
import { api, DbExecuteParams, needLogin } from '@/db/func';
import { getProjectListSchema, postProjectSchema } from '@/db/schemas/project';
import { Project } from '../params/project';
import { ForbiddenError } from '../errors';

const apiGetListAggregater = ({
  authInfo,
}: DbExecuteParams<any>): Document[] => [
  {
    $match: {
      $or: [
        {
          'owners._id': { $in: [authInfo?.user.id] },
        },
        {
          'assignees.user._id': { $in: [authInfo?.user.id] },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'Users',
      localField: 'owners._id',
      foreignField: '_id',
      as: 'owners',
    },
  },
  {
    $lookup: {
      from: 'Users',
      localField: 'assignees.user._id',
      foreignField: '_id',
      as: 'assignees.user',
    },
  },
];

export const apiGetList = async (req: NextRequest) =>
  await withTransaction(
    async (sessionSet) =>
      await api({
        req,
        sessionSet,
        schema: getProjectListSchema,
        authorize: needLogin,
        execute: async ({ params, sessionSet: { db, session } }) =>
          await db
            .collection(Project.collectionName)
            .aggregate(apiGetListAggregater(params), { session })
            .toArray(),
      })
  );

export const apiPost = async (req: NextRequest) =>
  await withTransaction(
    async (sessionSet) =>
      await api({
        req,
        sessionSet,
        schema: postProjectSchema,
        authorize: async (authParams) => {
          await needLogin(authParams);
          if (
            !authParams.params.owners.some(
              (owner: ExistingObject) =>
                owner._id == authParams.authInfo?.user.id
            )
          )
            throw new ForbiddenError();
        },
        execute: async ({ params, sessionSet: { db, session } }) =>
          await db.collection(Project.collectionName).insertOne(params, {
            session,
          }),
      })
  );
