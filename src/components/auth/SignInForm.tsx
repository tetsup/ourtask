'use client';
import { useForm } from 'react-hook-form';
import { authClient } from '@/auth/client';
import { SignInButton } from './SingInButton';
import { FormLayout } from '../common/layouts/FormLayout';
import {
  CommonPasswordField,
  CommonTextField,
} from '../common/parts/CommonInput';
import { CommonLink } from '../common/parts/CommonLink';

type SignInInfo = { email: string; password: string };

export const SignInForm = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: { email: '', password: '' },
  });
  const handleSignIn = (data: SignInInfo) => {
    authClient.signIn.email(data);
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <CommonTextField label="メールアドレス" {...register('email')} />
        <CommonPasswordField
          label="パスワード"
          {...register('password')}
          type="password"
        />
        <SignInButton />
      </form>
      <CommonLink href="/signUp">ユーザー登録はこちら</CommonLink>
    </FormLayout>
  );
};
