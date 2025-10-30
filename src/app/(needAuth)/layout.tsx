'use client';
import { ReactNode } from 'react';
import { authClient } from '@/auth/client';
import { SignInForm } from '@/components/auth/SignInForm';

export default function NeedLogin({ children }: { children: ReactNode }) {
  const session = authClient.useSession();

  return session.data ? children : <SignInForm />;
}
