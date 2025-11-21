import z from 'zod';
import { User } from '../params/user';

export const Project: ModelParams = {
  collectionName: 'Projects',
  apiPath: '/api/project',
};

export const roles = ['maintainer', 'reviewer', 'reporter', 'viewer'] as const;

const roleSchema = z.enum(roles);

const assignmentSchema =
  ({ existingObjectSchema }: SchemaRule) =>
  (sessionSet: SessionSet) =>
    z.object({
      assignee: existingObjectSchema({ sessionSet, modelParams: User }),
      role: roleSchema,
    });

export const postProjectSchema =
  ({ existingObjectSchema }: SchemaRule) =>
  (sessionSet: SessionSet) =>
    z.object({
      name: z.string().min(1).max(20),
      description: z.string().max(1000).optional(),
      owners: z.array(existingObjectSchema({ sessionSet, modelParams: User })),
      assignments: z.array(
        assignmentSchema({ existingObjectSchema })(sessionSet)
      ),
    });

export const getProjectListSchema = (_: SchemaRule) => (_: SessionSet) =>
  z.never();
