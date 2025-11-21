import type { ObjectId } from 'mongodb';
import type { UserOutput } from './user';
import { roleSchema } from '../schemas/project';

type Role = typeof roleSchema;

type AssignmentOutput<T extends string | ObjectId> = {
  assignee: UserOutput<T>;
  role: Role;
};

export type ProjectOutput<T extends string | ObjectId> = {
  name: string;
  description: string;
  owners: UserOutput<T>[];
  assignments: AssignmentOutput<T>[];
};
