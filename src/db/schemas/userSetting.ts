import z from 'zod';
import { languages } from '@/i18n/locales';

export const UserOption: ModelParams = {
  collectionName: 'UserSettings',
  apiPath: '/api/userSetting',
};

const boringVariants = [
  'pixel',
  'bauhaus',
  'ring',
  'beam',
  'sunset',
  'marble',
] as const;

const avatarSchema = z.object({
  source: z.literal('boring'),
  variant: z.enum(boringVariants),
  name: z.string().min(3).max(40),
});

export const getUserOptionSchema: SchemaFuncBuilder<any, any> =
  ({ joinUserSchema }) =>
  (schemaParams: SchemaParams) =>
    z.object({
      user: joinUserSchema(schemaParams),
    });

export const postUserOptionSchema: SchemaFuncBuilder<any, any> =
  ({ joinUserSchema }) =>
  (schemaParams: SchemaParams) =>
    z.object({
      user: joinUserSchema(schemaParams),
      lang: z.enum(Object.keys(languages)).default('ja'),
      avatar: avatarSchema.optional(),
      image: z.url().optional(),
    });
