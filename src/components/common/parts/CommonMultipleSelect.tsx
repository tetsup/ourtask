'use client';
import { FieldError } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextFieldProps } from '@mui/material';
import { CommonTextField } from './CommonInput';

type CommonMultipleSelectProps<T> = {
  label: string;
  slotProps?: {
    TextField?: TextFieldProps;
  };
  errorInfo?: FieldError;
} & Omit<AutocompleteProps<T, true, false, false>, 'renderInput'>;

export const CommonMultipleSelect = ({
  label,
  slotProps,
  errorInfo,
  ...props
}: CommonMultipleSelectProps<any>) => {
  return (
    <Autocomplete
      {...props}
      fullWidth
      multiple
      renderInput={(params) => (
        <CommonTextField
          {...slotProps?.TextField}
          {...params}
          label={label}
          error={!!errorInfo}
          helperText={errorInfo?.message ?? slotProps?.TextField?.helperText}
        />
      )}
    />
  );
};
