import { z } from 'zod';

const passwordSchema = z.string().min(8).max(1000);

export const signUpSchema = z
  .object({
    name: z.string().min(3).max(30),
    email: z.email(),
    password: passwordSchema,
    passwordVerification: passwordSchema,
  })
  .refine((v) => v.password === v.passwordVerification, {
    message: 'needed to be same as password',
    path: ['passwordVerification'],
  });
