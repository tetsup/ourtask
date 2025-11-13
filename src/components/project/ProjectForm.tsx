'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, projectSchema } from '@/db/schemas/client/project';
import { usePostOrPut } from '@/hooks/api';
import { useLanguage } from '@/i18n/provider';
import { MultipleUserSelect } from '../user/MultipleUserSelect';
import { AssigneeControl } from '../user/AssigneeControl';
import { CommonTextField } from '../common/parts/CommonInput';
import { CommonButton } from '../common/parts/CommonButton';
import { CommonForm } from '../common/layouts/CommonForm';

type ProjectFormProps = {
  _id?: string;
  defaultValues: Project;
};

export const ProjectForm = ({ _id, defaultValues }: ProjectFormProps) => {
  const { t } = useLanguage();
  const postOrPut = usePostOrPut('/api/project', _id);
  const form = useForm({ resolver: zodResolver(projectSchema), defaultValues });
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
      <AssigneeControl name="assignments" control={control} />
      <CommonButton type="submit" />
    </CommonForm>
  );
};
