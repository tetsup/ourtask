'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/auth/client';
import { signUpSchema } from '@/auth/signUpSchema';
import { FormLayout } from '../common/layouts/FormLayout';
import {
  CommonPasswordField,
  CommonTextField,
} from '../common/parts/CommonInput';
import { CommonButton } from '../common/parts/CommonButton';
import { Backdrop, Typography } from '@mui/material';
import { useState } from 'react';
import { CommonLink } from '../common/parts/CommonLink';

type SignUpInfo = z.infer<typeof signUpSchema>;

type FormStatus = 'editing' | 'confirming' | 'succeeded';

export const SignUpForm = () => {
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
        <Typography variant="h5">サインアップ</Typography>
        {status !== 'succeeded' ? (
          <>
            <Typography variant="h6" color="red">
              {errorMessage}
            </Typography>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <CommonTextField
                label="ユーザー名"
                errorInfo={errors.name}
                {...register('name')}
              />
              <CommonTextField
                label="メールアドレス"
                errorInfo={errors.email}
                {...register('email')}
              />
              <CommonPasswordField
                label="パスワード"
                {...register('password')}
              />
              <CommonPasswordField
                label="パスワード確認"
                {...register('passwordVerification')}
              />
              <CommonButton type="submit">Sign Up</CommonButton>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h6">ユーザーが作成されました</Typography>
            <CommonLink href="/">ホームに戻る</CommonLink>
          </>
        )}
      </FormLayout>
    </>
  );
};
