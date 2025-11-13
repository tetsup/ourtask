import { useLanguage } from '@/i18n/provider';
import { List, ListItem } from '@mui/material';
import { Control, FieldValues, Path, useFieldArray } from 'react-hook-form';
import { CommonButton } from '../common/parts/CommonButton';
import { RoleSelect } from '../role/RoleSelect';
import { SingleUserSelect } from './SingleUserSelect';

type AssigmeeControlProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};
export const AssigneeControl = ({
  name,
  control,
}: AssigmeeControlProps<any>) => {
  const { t } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });
  return (
    <List>
      {fields.map((_, index) => (
        <ListItem>
          <SingleUserSelect
            name={`assignees.${index}.user`}
            control={control}
            label={t.user.name}
          />
          <RoleSelect
            name={`assignees.${index}.role`}
            control={control}
            label={t.common.role}
          />
          <CommonButton
            onClick={() => {
              remove(index);
            }}
          ></CommonButton>
        </ListItem>
      ))}
      <CommonButton
        onClick={() => {
          append({});
        }}
      >
        {t.common.append}
      </CommonButton>
    </List>
  );
};
