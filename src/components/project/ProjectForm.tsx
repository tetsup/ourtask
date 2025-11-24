'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { postProjectSchema } from '@/db/schemas/project';
import { clientRules } from '@/db/rules/client';
import { usePostOrPut } from '@/hooks/api';
import { useLanguage } from '@/i18n/provider';
import { MultipleUserSelect } from '../user/MultipleUserSelect';
import { AssignmentControl } from '../user/AssignmentControl';
import { CommonTextField } from '../common/parts/CommonInput';
import { CommonButton } from '../common/parts/CommonButton';
import { CommonForm } from '../common/layouts/CommonForm';

const clientPostProjectSchema = postProjectSchema(clientRules);

export type ProjectFormProps = {
  _id?: string;
  defaultValues: z.input<typeof clientPostProjectSchema>;
};

export const ProjectForm = ({ _id, defaultValues }: ProjectFormProps) => {
  const { t } = useLanguage();
  const postOrPut = usePostOrPut('/api/project', _id);
  const form = useForm({
    resolver: zodResolver(clientPostProjectSchema),
    defaultValues,
  });
  const { register, control } = form;

  return (
    <CommonForm {...form} onSubmit={postOrPut}>
      <CommonTextField label={t.project.name} {...register('name')} />
      <CommonTextField
        label={t.project.description}
        multiline
        {...register('description')}
      />
      <MultipleUserSelect
        name="ownerIds"
        control={control}
        label={t.project.owners}
      />
      <AssignmentControl name="assignments" control={control} />
      <CommonButton type="submit" />
    </CommonForm>
  );
};
