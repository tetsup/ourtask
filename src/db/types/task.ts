import { statuses } from '../schemas/task';
import type { UserOutput, UserRef } from './user';
import type { ProjectOutput, ProjectRef } from './project';
import type { IdLike, RefType } from './common';

export type TaskOutput<T extends IdLike> = {
  _id: T;
  subject: string;
  description?: string;
  project: ProjectOutput<T>;
  parent?: TaskOutput<T>;
  assignees: UserOutput<T>[];
  status: (typeof statuses)[number];
  dueDate: Date;
  estimatedMinutes: number;
};

export type TaskInput<T extends IdLike> = {
  subject: string;
  description?: string;
  project: ProjectRef<T>;
  parent?: TaskRef<T>;
  assignees: UserRef<T>[];
  status: (typeof statuses)[number];
  dueDate: Date;
  estimatedMinutes: number;
};

export type TaskRef<T extends IdLike> = RefType<T, TaskOutput<T>>;
