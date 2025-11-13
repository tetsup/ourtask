import z from 'zod';

const roles = ['mentainer', 'reviewer', 'reporter', 'viewer'] as const;

const roleSchema = z.enum(roles);
export const assignmentSchemaBase = (idSchema: any) =>
  z.object({ assigneeId: idSchema, role: roleSchema });

export const projectSchemaBase = (idSchema: any) =>
  z.object({
    name: z.string().min(1).max(20),
    description: z.string().max(1000).optional(),
    ownerIds: z.array(idSchema),
    assignments: z.array(assignmentSchemaBase(idSchema)),
  });
