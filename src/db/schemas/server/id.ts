import z from 'zod';
import { ObjectId } from 'mongodb';

export const idSchema: z.ZodType<ObjectId> = z.union([
  z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/)
    .transform((v) => new ObjectId(v)),
  z.instanceof(ObjectId),
]);
