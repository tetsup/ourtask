import { languages } from '@/i18n/locales';
import { z } from 'zod';

const passwordSchema = z.string().min(8).max(1000);

const defaultUserSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.email(),
});

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

export const appUserSchema = defaultUserSchema.extend({
  lang: z.enum(Object.keys(languages)).default('ja'),
  avatar: avatarSchema.optional(),
  emailVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.url().optional(),
});

export const signUpSchema = appUserSchema
  .extend({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'needed to be same as password',
    path: ['passwordVerification'],
  });

export const additionalFields = {
  lang: {
    type: 'string',
  },
  'avatar.source': {
    type: 'string',
  },
  'avatar.variant': { type: 'string' },
  'avatar.name': { type: 'string' },
};

export type User = z.infer<typeof appUserSchema>;
