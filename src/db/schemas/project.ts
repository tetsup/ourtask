import z from 'zod';
import { User } from '../params/user';

export const Project: ModelParams = {
  collectionName: 'Projects',
  apiPath: '/api/project',
};

export const roles = ['maintainer', 'reviewer', 'reporter', 'viewer'] as const;

export const roleSchema = z.enum(roles);

const assignmentSchema: SchemaFuncBuilder<any, any> =
  ({ joinRefSchema }) =>
  (schemaParams: SchemaParams) =>
    z.object({
      assignee: joinRefSchema(User)(schemaParams),
      role: roleSchema,
    });

export const postProjectSchema: SchemaFuncBuilder<any, any> =
  (schemaRules) => (schemaParams: SchemaParams) =>
    z.object({
      name: z.string().min(1).max(20),
      description: z.string().max(1000).optional(),
      owners: z.array(schemaRules.joinRefSchema(User)(schemaParams)),
      assignments: z.array(assignmentSchema(schemaRules)(schemaParams)),
    });

export const getProjectListSchema: SchemaFuncBuilder<any, any> = () => () =>
  z.null();
