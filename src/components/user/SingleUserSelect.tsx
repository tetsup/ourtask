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
  const { data, setQuery } = useQuery('/api/user/', [] as UserOutput<string>[]);
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <CommonSingleSelect
          {...props}
          options={data}
          onInputChange={(_, v) => {
            setQuery({ word: v });
          }}
          getOptionLabel={(user) => `${user.name}<${user.email}>`}
          label={label}
        />
      )}
    />
  );
};
