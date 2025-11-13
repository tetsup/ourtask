'use client';
import z from 'zod';
import { authClient } from '@/auth/client';
import { assignmentSchemaBase, projectSchemaBase } from '../base/project';
import { User } from '../base/user';
import { idSchema, WithId } from './id';

export const projectSchema = projectSchemaBase(idSchema);
const assignmentSchema = assignmentSchemaBase(idSchema);

export type Project = z.input<typeof projectSchema>;

export type ProjectFull = WithId<
  Omit<z.infer<typeof projectSchema>, 'assignments'> & {
    owners: WithId<User>[];
    assignments: (z.infer<typeof assignmentSchema> & { assignee: User })[];
  }
>;

export const newProject = (): Project => {
  return {
    name: '',
    description: '',
    ownerIds: [],
    assignments: [],
  };
};
