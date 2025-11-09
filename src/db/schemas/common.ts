import { ObjectId } from 'mongodb';
import z from 'zod';

export const idSchema = z.instanceof(ObjectId);
export const assignmentSchema = z.object({
  userId: idSchema,
  role: idSchema,
});
