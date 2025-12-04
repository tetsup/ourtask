import {
  Control,
  Controller,
  FieldPathValue,
  FieldValues,
  Path,
} from 'react-hook-form';
import { UserOutput } from '@/db/types/user';
import { useQuery } from '@/hooks/api';
import { CommonMultipleSelect } from '@/components/common/parts/CommonMultipleSelect';
import { UserChip } from './UserChip';

type FieldByType<F extends FieldValues, T> = {
  [P in Path<F>]: T extends FieldPathValue<F, P> ? P : never;
}[Path<F>];

type MultipleUserSelectProps<T extends FieldValues> = {
  name: FieldByType<T, UserOutput<string>>;
  control: Control<T>;
  label: string;
};

export const MultipleUserSelect = ({
  name,
  control,
  label,
}: MultipleUserSelectProps<any>) => {
  const { data, setQuery } = useQuery<UserOutput<string>[], any>({
    endpoint: '/api/user/',
    initData: [] as UserOutput<string>[],
    initQuery: {
      word: '',
    },
  });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CommonMultipleSelect
          {...field}
          onChange={(_, v) => {
            field.onChange(v);
          }}
          options={data}
          isOptionEqualToValue={(op, v) => op._id === v._id}
          onInputChange={(_, v) => {
            setQuery({ word: v });
          }}
          getOptionLabel={(user) => `${user?.name}<${user?.email}>`}
          renderValue={(users) =>
            users.map((user) => <UserChip key={user._id} user={user} />)
          }
          label={label}
          errorInfo={fieldState.error}
        />
      )}
    />
  );
};
