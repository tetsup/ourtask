import { useLanguage } from '@/i18n/provider';
import { Grid } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Control, FieldValues, Path, useFieldArray } from 'react-hook-form';
import { CommonButton, CommonIconButton } from '../common/parts/CommonButton';
import { RoleSelect } from '../role/RoleSelect';
import { SingleUserSelect } from './SingleUserSelect';

type AssignmentControlProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};
export const AssignmentControl = ({
  name,
  control,
}: AssignmentControlProps<any>) => {
  const { t } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });
  return (
    <>
      {fields.map((_, index) => (
        <Grid key={index} container columnSpacing={1} sx={{ width: '100%' }}>
          <Grid size={6}>
            <SingleUserSelect
              name={`assignments.${index}.assignee`}
              control={control}
              label={t.user.name}
            />
          </Grid>
          <Grid size={4}>
            <RoleSelect
              name={`assignments.${index}.role`}
              control={control}
              label={t.common.role}
            />
          </Grid>
          <Grid size={2}>
            <CommonIconButton
              onClick={() => {
                remove(index);
              }}
            >
              <DeleteIcon />
            </CommonIconButton>
          </Grid>
        </Grid>
      ))}
      <CommonButton
        onClick={() => {
          append({});
        }}
      >
        {t.common.append}
      </CommonButton>
    </>
  );
};
