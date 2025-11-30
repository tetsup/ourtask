import { ReactNode } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

type CommonFormProps<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: (data: T) => void | Promise<void>;
} & UseFormReturn<T>;
export const CommonForm = ({
  children,
  onSubmit,
  ...form
}: CommonFormProps<any>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
