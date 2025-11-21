import z from 'zod';

export const queryWordSchema: SchemaFuncBuilder<any, any> = (_) => (_) =>
  z.object({ word: z.string() });
