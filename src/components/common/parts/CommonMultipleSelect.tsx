'use client';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextFieldProps } from '@mui/material';
import { CommonTextField } from './CommonInput';

type RenderParams = {
  field: ControllerRenderProps<FieldValues, any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};
type CommonMultipleSelectProps = {
  label: string;
  slotProps?: {
    TextField?: TextFieldProps;
  };
} & RenderParams &
  Omit<AutocompleteProps<any, true, false, false>, 'renderInput'>;

export const CommonMultipleSelect = ({
  label,
  slotProps,
  field,
  fieldState,
  formState,
  ...props
}: CommonMultipleSelectProps) => {
  return (
    <Autocomplete
      {...props}
      fullWidth
      value={field.value ?? []}
      multiple
      renderInput={(params) => (
        <CommonTextField
          {...slotProps?.TextField}
          {...params}
          label={label}
          error={!!fieldState.error}
          helperText={
            fieldState.error?.message ?? slotProps?.TextField?.helperText
          }
        />
      )}
    />
  );
};
