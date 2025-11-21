'use server';
import { ObjectId } from 'mongodb';
import z from 'zod';

const idSchema: z.ZodType<ObjectId> = z.union([
  z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/)
    .transform((v) => ObjectId.createFromHexString(v)),
  z.instanceof(ObjectId),
]);

const existingObjectSchema = ({
  modelParams: { collectionName },
  sessionSet: { db, session },
}: SchemaParams) =>
  z
    .object({ _id: idSchema })
    .refine(
      async (v) =>
        (await db
          .collection(collectionName)
          .findOne({ _id: v._id }, { session })) != null
    );

export const serverRule: SchemaRule = { existingObjectSchema };
