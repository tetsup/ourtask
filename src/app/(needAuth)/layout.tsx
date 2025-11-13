'use client';
import { ReactNode } from 'react';
import { authClient } from '@/auth/client';
import { SignInForm } from '@/components/auth/SignInForm';
import { CommonBackdrop } from '@/components/common/parts/CommonBackdrop';

export default function NeedLogin({ children }: { children: ReactNode }) {
  const session = authClient.useSession();

  return (
    <main>
      {session.isPending || session.isRefetching ? (
        <CommonBackdrop open={true} />
      ) : session.data ? (
        children
      ) : (
        <SignInForm />
      )}
    </main>
  );
}
