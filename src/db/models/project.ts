'use server';
import { NextRequest } from 'next/server';
import { Document, ObjectId } from 'mongodb';
import { withTransaction } from '@/db/setup';
import { api, needLogin } from '@/db/func';
import { getProjectListSchema, postProjectSchema } from '@/db/schemas/project';
import { Project } from '../params/project';
import { ForbiddenError, NotFoundError } from '../errors';
import { User, UserRef } from '../types/user';

const apiGetListAggregater = (signInUser: User | null): Document[] => [
  {
    $match: {
      $or: [
        {
          'owners._id': ObjectId.createFromHexString(signInUser?._id!),
        },
        {
          'assignments.assignee._id': ObjectId.createFromHexString(
            signInUser?._id!
          ),
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
      localField: 'assignments.assignee._id',
      foreignField: '_id',
      as: 'assignees',
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          {
            assignments: {
              $mergeObjects: [
                {
                  assignee: { $arrayElemAt: ['$assignees', 0] },
                  role: { $arrayElemAt: ['$assignments.role', 0] },
                },
              ],
            },
          },
          '$$ROOT',
        ],
      },
    },
  },
  {
    $project: { assignees: 0 },
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
        execute: async ({ signInUser, sessionSet: { db, session } }) => {
          const data = await db
            .collection(Project.collectionName)
            .aggregate(apiGetListAggregater(signInUser), { session })
            .toArray();
          return data;
        },
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

export const apiPut = async (req: NextRequest, _id: ObjectId) =>
  await withTransaction(
    async (sessionSet) =>
      await api({
        req,
        sessionSet,
        schema: postProjectSchema,
        authorize: async (authParams) => {
          await needLogin(authParams);
          const { db, session } = authParams.sessionSet;
          const serverData = await db
            .collection(Project.collectionName)
            .findOne({ _id }, { session });
          if (!serverData) throw new NotFoundError();
          if (
            !serverData.owners.some((owner: UserRef<ObjectId>) =>
              owner._id.equals(authParams.signInUser?._id)
            )
          )
            throw new ForbiddenError();
        },
        execute: async ({ params, sessionSet: { db, session } }) =>
          await db.collection(Project.collectionName).updateOne(
            { _id },
            { $set: params },
            {
              session,
            }
          ),
      })
  );
