import z from 'zod';

export const queryWordSchema = (_: SchemaRule) => (_: SessionSet) =>
  z.object({ word: z.string() });
