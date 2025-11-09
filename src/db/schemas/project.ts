import z from 'zod';
import { assignmentSchema, idSchema } from './common';

export const projectSchema = z.object({
  name: z.string().min(1).max(20),
  description: z.string().max(1000).optional(),
  ownerIds: z.array(idSchema),
  assignees: z.array(assignmentSchema),
});
