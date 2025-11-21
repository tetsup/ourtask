'use server';
import { ObjectId } from 'mongodb';
import z from 'zod';
import { User } from '../params/user';

const idSchema: z.ZodType<ObjectId> = z.union([
  z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/)
    .transform((v) => ObjectId.createFromHexString(v)),
  z.instanceof(ObjectId),
]);

const joinUserSchema: SchemaRule<SessionSet> = ({ db, session }) =>
  z
    .object({ _id: idSchema })
    .refine(
      async (v) =>
        (await db
          .collection(User.collectionName)
          .findOne({ _id: v._id }, { session })) != null
    );

export const serverRules: SchemaRules<SessionSet> = { joinUserSchema };
