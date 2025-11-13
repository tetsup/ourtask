import z from 'zod';
import { projectSchemaBase } from '../base/project';
import { idSchema } from './id';

export const projectSchema = projectSchemaBase(idSchema);
export type Project = z.infer<typeof projectSchema>;
