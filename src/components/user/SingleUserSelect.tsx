import {
  Control,
  Controller,
  FieldPathValue,
  FieldValues,
  Path,
} from 'react-hook-form';
import { useQuery } from '@/hooks/api';
import { CommonSingleSelect } from '@/components/common/parts/CommonSingleSelect';
import { UserOutput } from '@/db/types/user';
import { UserChip } from './UserChip';

type FieldByType<F extends FieldValues, T> = {
  [P in Path<F>]: T extends FieldPathValue<F, P> ? P : never;
}[Path<F>];

type SingleUserSelectProps<T extends FieldValues> = {
  name: FieldByType<T, UserOutput<string>>;
  control: Control<T>;
  label: string;
};

export const SingleUserSelect = ({
  name,
  control,
  label,
}: SingleUserSelectProps<any>) => {
  const { data, setQuery } = useQuery({
    endpoint: '/api/user/',
    initData: [] as UserOutput<string>[],
  });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CommonSingleSelect
          {...field}
          onChange={(_, v) => {
            field.onChange(v);
          }}
          options={data}
          onInputChange={(_, v) => {
            setQuery({ word: v });
          }}
          getOptionLabel={(user) => `${user.name}<${user.email}>`}
          label={label}
          renderValue={(user) => <UserChip key={user._id} user={user} />}
          errorInfo={fieldState.error}
        />
      )}
    />
  );
};
