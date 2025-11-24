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
  const { data, setQuery } = useQuery(
    '/api/user/',
    [] as UserOutput<string>[],
    {
      word: '',
    }
  );
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CommonMultipleSelect
          {...field}
          options={data.map((user) => user?._id)}
          onInputChange={(_, v) => {
            setQuery({ word: v });
          }}
          getOptionLabel={(_id) => {
            const user = data.find((u) => u?._id === _id);
            return `${user?.name}<${user?.email}>`;
          }}
          label={label}
        />
      )}
    />
  );
};
