import { ReactNode } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

type CommonFormProps<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: (data: T) => Promise<void>;
} & UseFormReturn<T>;
export const CommonForm = ({
  children,
  onSubmit,
  ...form
}: CommonFormProps<any>) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
};
