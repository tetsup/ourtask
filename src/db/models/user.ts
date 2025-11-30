'use server';
import { NextRequest } from 'next/server';
import { Document } from 'mongodb';
import { withTransaction } from '@/db/setup';
import { api, needLogin } from '@/db/func';
import { User } from '@/db/params/user';
import { queryWordSchema } from '../schemas/common';

const apiGetListAggregater = (params: any): Document[] => [
  {
    $match: {
      $or: [
        { name: { $regex: params.word } },
        { email: { $regex: params.word } },
      ],
    },
  },
  {
    $lookup: {
      from: 'UserOptions',
      localField: '_id',
      foreignField: 'userId',
      as: 'option',
    },
  },
];

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
            .aggregate(apiGetListAggregater(params), { session })
            .limit(10)
            .toArray(),
      })
  );
