import z from 'zod';

const idSchema = z.string().regex(/^[a-fA-F0-9]{24}$/);

const joinUserSchema = ({}) => z.object({ _id: idSchema });

const clientRules: SchemaRules<{}> = { joinUserSchema };

export const clientSchema = (baseSchema: SchemaFuncBuilder<any, any>) =>
  baseSchema(clientRules)();
