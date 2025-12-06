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
type CommonSingleSelectProps = {
  label: string;
  slotProps?: {
    TextField?: TextFieldProps;
  };
} & RenderParams &
  Omit<AutocompleteProps<any, false, any, false>, 'renderInput'>;

export const CommonSingleSelect = ({
  label,
  slotProps,
  field,
  fieldState,
  formState,
  ...props
}: CommonSingleSelectProps) => {
  return (
    <Autocomplete
      {...props}
      fullWidth
      disableClearable
      value={field.value}
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
