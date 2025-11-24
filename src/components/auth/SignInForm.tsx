'use client';
import { useForm } from 'react-hook-form';
import { authClient } from '@/auth/client';
import { useLanguage } from '@/i18n/provider';
import { FormLayout } from '../common/layouts/FormLayout';
import {
  CommonPasswordField,
  CommonTextField,
} from '../common/parts/CommonInput';
import { CommonLink } from '../common/parts/CommonLink';
import { SignInButton } from './SingInButton';

type SignInInfo = { email: string; password: string };

export const SignInForm = () => {
  const { t } = useLanguage();
  const { handleSubmit, register } = useForm({
    defaultValues: { email: '', password: '' },
  });
  const handleSignIn = (data: SignInInfo) => {
    authClient.signIn.email(data);
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <CommonTextField label={t.user.email} {...register('email')} />
        <CommonPasswordField
          label={t.user.password}
          {...register('password')}
          type="password"
        />
        <SignInButton />
      </form>
      <CommonLink href="/signUp">{t.auth.signUp}</CommonLink>
    </FormLayout>
  );
};
