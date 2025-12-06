'use client';
import { FieldError } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextFieldProps } from '@mui/material';
import { CommonTextField } from './CommonInput';

type CommonSingleSelectProps = {
  label: string;
  slotProps?: {
    TextField?: TextFieldProps;
  };
  errorInfo?: FieldError;
} & Omit<AutocompleteProps<any, false, any, false>, 'renderInput'>;

export const CommonSingleSelect = ({
  label,
  slotProps,
  errorInfo,
  ...props
}: CommonSingleSelectProps) => {
  return (
    <Autocomplete
      {...props}
      value={props.value ?? null}
      fullWidth
      disableClearable
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
