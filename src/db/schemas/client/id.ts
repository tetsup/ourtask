'use client';
import z from 'zod';

export const idSchema = z.string().regex(/^[a-fA-F0-9]{24}$/);
export type WithId<T extends object> = T & { _id: string };
