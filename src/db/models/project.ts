'use server';
import { NextRequest } from 'next/server';
import { Document, ObjectId } from 'mongodb';
import { withTransaction } from '@/db/setup';
import { api, DbExecuteParams, needLogin } from '@/db/func';
import { getProjectListSchema, postProjectSchema } from '@/db/schemas/project';
import { Project } from '../params/project';
import { ForbiddenError } from '../errors';
import { UserRef } from '../types/user';

const apiGetListAggregater = ({
  signInUser,
}: DbExecuteParams<any>): Document[] => [
  {
    $match: {
      $or: [
        {
          'owners._id': { $in: [signInUser?._id] },
        },
        {
          'assignees.user._id': { $in: [signInUser?._id] },
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
      localField: 'assignees.assignee._id',
      foreignField: '_id',
      as: 'assignees.assignee',
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
            !authParams.params.owners.some((owner: UserRef<ObjectId>) =>
              owner._id.equals(authParams.signInUser?._id)
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
