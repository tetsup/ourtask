'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { postProjectSchema } from '@/db/schemas/project';
import { clientSchema } from '@/db/rules/client';
import { usePostOrPut } from '@/hooks/api';
import { useLanguage } from '@/i18n/provider';
import { useLogging } from '@/contexts/Logging';
import { MultipleUserSelect } from '../user/MultipleUserSelect';
import { AssignmentControl } from '../user/AssignmentControl';
import { CommonTextField } from '../common/parts/CommonInput';
import { CommonSubmitButton } from '../common/parts/CommonButton';
import { CommonForm } from '../common/layouts/CommonForm';

const clientPostProjectSchema = clientSchema(postProjectSchema);

export type ProjectFormProps = {
  _id?: string;
  defaultValues: z.input<typeof clientPostProjectSchema>;
  postSubmit?: () => Promise<void>;
};

export const ProjectForm = ({
  _id,
  defaultValues,
  postSubmit,
}: ProjectFormProps) => {
  const { addLog } = useLogging();
  const { t } = useLanguage();
  const postOrPut = usePostOrPut({
    endpoint: '/api/project',
    _id,
    callback: postSubmit,
  });
  const form = useForm({
    resolver: zodResolver(clientPostProjectSchema),
    defaultValues,
  });
  const { register, control, formState } = form;

  return (
    <CommonForm
      {...form}
      onSubmit={(data) => {
        addLog(data);
        postOrPut(data);
      }}
    >
      <CommonTextField
        {...register('name')}
        label={t.project.name}
        errorInfo={formState.errors.name}
      />
      <CommonTextField
        {...register('description')}
        label={t.project.description}
        multiline
        errorInfo={formState.errors.description}
      />
      <MultipleUserSelect
        name="owners"
        control={control}
        label={t.project.owners}
      />
      <AssignmentControl name="assignments" control={control} />
      <CommonSubmitButton />
    </CommonForm>
  );
};
