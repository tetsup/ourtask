import z from 'zod';

export const queryWordSchema: SchemaFuncBuilder<any, any> = () => () =>
  z.object({ word: z.string() });
