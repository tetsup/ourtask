import {
  Control,
  Controller,
  FieldPathValue,
  FieldValues,
  Path,
} from 'react-hook-form';
import { CommonSingleSelect } from '@/components/common/parts/CommonSingleSelect';
import { roles } from '@/db/schemas/project';
import { useLanguage } from '@/i18n/provider';

type FieldByType<F extends FieldValues, T> = {
  [P in Path<F>]: T extends FieldPathValue<F, P> ? P : never;
}[Path<F>];

type RoleSelectProps<T extends FieldValues> = {
  name: FieldByType<T, (typeof roles)[number]>;
  control: Control<T>;
  label: string;
};

export const RoleSelect = ({ name, control, label }: RoleSelectProps<any>) => {
  const { t } = useLanguage();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CommonSingleSelect
          {...field}
          options={roles}
          onChange={(_, v) => {
            field.onChange(v);
          }}
          renderValue={(v: (typeof roles)[number]) => t.role[v]}
          label={label}
          errorInfo={fieldState.error}
        />
      )}
    />
  );
};
