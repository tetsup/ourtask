import z from 'zod';

const idSchema = z.string().regex(/^[a-fA-F0-9]{24}$/);

const existingObjectSchema = ({}: SchemaParams) => z.object({ _id: idSchema });

export const clientRule: SchemaRule = { existingObjectSchema };
