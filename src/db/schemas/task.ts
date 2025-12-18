import z from 'zod';
import { Project } from './project';
import { User } from '../params/user';
import { rangeSchema } from './common';

export const Task: ModelParams = {
  collectionName: 'Tasks',
  apiPath: '/api/task',
};

export const statuses = ['backlog', 'todo', 'doing', 'complete', 'drop'];

export const postTaskSchema: SchemaFuncBuilder<any, any> =
  (schemaRules) => (schemaParams: SchemaParams) =>
    z.object({
      subject: z.string().min(1).max(20),
      description: z.string().max(1000).optional(),
      project: schemaRules.joinRefSchema(Project)(schemaParams),
      parent: schemaRules.joinRefSchema(Task)(schemaParams).optional(),
      assignees: z.array(schemaRules.joinRefSchema(User)(schemaParams)),
      status: z.enum(statuses),
      dueDate: z.date().optional(),
      estimatedMinutes: z.number().min(0).optional(),
    });

export const getTaskListSchema: SchemaFuncBuilder<any, any> =
  ({ idSchema }) =>
  () =>
    z.object({
      subject: z.string().optional(),
      projectId: idSchema.optional(),
      parentId: idSchema.optional(),
      assigneeIds: z.array(idSchema).optional(),
      status: z.enum(statuses),
      dueDate: rangeSchema(z.date()).optional(),
      estimatedMinutes: rangeSchema(z.number()).optional(),
    });
