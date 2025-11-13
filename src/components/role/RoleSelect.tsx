import {
  Control,
  Controller,
  FieldPathValue,
  FieldValues,
  Path,
} from 'react-hook-form';
import { User } from '@/db/schemas/base/user';
import { useQuery } from '@/hooks/api';
import { CommonSingleSelect } from '@/components/common/parts/CommonSingleSelect';

type FieldByType<F extends FieldValues, T> = {
  [P in Path<F>]: T extends FieldPathValue<F, P> ? P : never;
}[Path<F>];

type RoleSelectProps<T extends FieldValues> = {
  name: FieldByType<T, User>;
  control: Control<T>;
  label: string;
};

export const RoleSelect = ({ name, control, label }: RoleSelectProps<any>) => {
  const { data, setQuery } = useQuery('/api/role/', []);
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <CommonSingleSelect
          {...props}
          options={data}
          onInputChange={(_, v) => {
            setQuery(v);
          }}
          label={label}
        />
      )}
    />
  );
};
