'use client';
import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Backdrop, Typography } from '@mui/material';
import { authClient } from '@/auth/client';
import { signUpSchema } from '@/db/schemas/base/user';
import { useLanguage } from '@/i18n/provider';
import { FormLayout } from '../common/layouts/FormLayout';
import {
  CommonPasswordField,
  CommonTextField,
} from '../common/parts/CommonInput';
import { CommonButton } from '../common/parts/CommonButton';
import { CommonLink } from '../common/parts/CommonLink';

type SignUpInfo = z.infer<typeof signUpSchema>;

type FormStatus = 'editing' | 'confirming' | 'succeeded';

export const SignUpForm = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>('editing');
  const [errorMessage, setErrorMessage] = useState<string>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const handleSignUp = (data: SignUpInfo) => {
    setStatus('confirming');
    authClient.signUp.email(data).then((value) => {
      if (!!value.error) {
        setStatus('editing');
        setErrorMessage(value.error.message);
      } else {
        setStatus('succeeded');
        setErrorMessage(undefined);
      }
    });
  };

  return (
    <>
      <Backdrop open={status === 'confirming'} />
      <FormLayout>
        <Typography variant="h5">{t.auth.signUp}</Typography>
        {status !== 'succeeded' ? (
          <>
            <Typography variant="h6" color="red">
              {errorMessage}
            </Typography>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <CommonTextField
                label={t.user.name}
                errorInfo={errors.name}
                {...register('name')}
              />
              <CommonTextField
                label={t.user.email}
                errorInfo={errors.email}
                {...register('email')}
              />
              <CommonPasswordField
                label={t.user.password}
                {...register('password')}
              />
              <CommonPasswordField
                label={t.user.confirmPassword}
                {...register('confirmPassword')}
              />
              <CommonButton type="submit">{t.auth.signUp}</CommonButton>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h6">
              {t.message.created(t.common.theUser)}
            </Typography>
            <CommonLink href="/">{t.common.backTo(t.common.home)}</CommonLink>
          </>
        )}
      </FormLayout>
    </>
  );
};
