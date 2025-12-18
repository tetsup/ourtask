import { ObjectId } from 'mongodb';
import z from 'zod';

const idSchema: z.ZodType<ObjectId> = z.union([
  z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/)
    .transform((v) => ObjectId.createFromHexString(v)),
  z.instanceof(ObjectId),
]);

const joinRefSchema =
  (model: ModelParams): SchemaFunc<SessionSet, any> =>
  ({ db, session }) =>
    z
      .object({ _id: idSchema })
      .refine(
        async (v) =>
          (await db
            .collection(model.collectionName)
            .findOne({ _id: v._id }, { session })) != null
      );

const serverRules: SchemaRules<SessionSet> = { joinRefSchema, idSchema };

export const serverSchema = (baseSchema: SchemaFuncBuilder<any, any>) =>
  baseSchema(serverRules);
