import z from 'zod';

const idSchema = z.string().regex(/^[a-fA-F0-9]{24}$/);

const joinUserSchema = ({}) => z.object({ _id: idSchema });

export const clientRules: SchemaRules<{}> = { joinUserSchema };
