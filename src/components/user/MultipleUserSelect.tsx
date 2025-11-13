import {
  Control,
  Controller,
  FieldPathValue,
  FieldValues,
  Path,
} from 'react-hook-form';
import { User } from '@/db/schemas/base/user';
import { useQuery } from '@/hooks/api';
import { CommonMultipleSelect } from '@/components/common/parts/CommonMultipleSelect';

type FieldByType<F extends FieldValues, T> = {
  [P in Path<F>]: T extends FieldPathValue<F, P> ? P : never;
}[Path<F>];

type MultipleUserSelectProps<T extends FieldValues> = {
  name: FieldByType<T, User>;
  control: Control<T>;
  label: string;
};

export const MultipleUserSelect = ({
  name,
  control,
  label,
}: MultipleUserSelectProps<any>) => {
  const { data, setQuery } = useQuery('/api/user/', []);
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <CommonMultipleSelect
          field={props.field}
          fieldState={props.fieldState}
          formState={props.formState}
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
