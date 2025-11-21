import { auth } from '@/auth/server';

export type User = typeof auth.$Infer.Session.user;
