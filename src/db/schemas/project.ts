import z from 'zod';
import { User } from '../params/user';

export const Project: ModelParams = {
  collectionName: 'Projects',
  apiPath: '/api/project',
};

export const roles = ['maintainer', 'reviewer', 'reporter', 'viewer'] as const;

export const roleSchema = z.enum(roles);

const assignmentSchema: SchemaFuncBuilder<any, any> =
  ({ joinUserSchema }) =>
  (schemaParams) =>
    z.object({
      assignee: joinUserSchema(schemaParams),
      role: roleSchema,
    });

export const postProjectSchema: SchemaFuncBuilder<any, any> =
  (schemaRules) => (schemaParams) =>
    z.object({
      name: z.string().min(1).max(20),
      description: z.string().max(1000).optional(),
      owners: z.array(schemaRules.joinUserSchema(schemaParams)),
      assignments: z.array(assignmentSchema(schemaRules)(schemaParams)),
    });

export const getProjectListSchema: SchemaFuncBuilder<any, any> = () => () =>
  z.never();
