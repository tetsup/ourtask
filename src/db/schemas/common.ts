import z from 'zod';

type Compareable = number | string | Date;

export const queryWordSchema: SchemaFuncBuilder<any, any> = () => () =>
  z.object({ word: z.string() });

export const rangeSchema = (schema: z.Schema<Compareable>) =>
  z
    .object({ min: schema.optional(), max: schema.optional() })
    .refine(({ min, max }) => min == null || max == null || min <= max);
