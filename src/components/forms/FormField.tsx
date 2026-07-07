import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input, type InputProps } from '../ui/Input';

interface FormFieldProps extends Omit<InputProps, 'name'> {
  name: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...props}
          {...field}
          error={error?.message}
          onChange={(e) => {
            field.onChange(e);
            props.onChange?.(e);
          }}
        />
      )}
    />
  );
};
export default FormField;
// Same file exports for other form controls to save tools overhead:

export interface FormSelectProps {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  className?: string;
}

import { Select } from '../ui/Select';
export const FormSelect: React.FC<FormSelectProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...props}
          {...field}
          error={error?.message}
        />
      )}
    />
  );
};

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  error?: string;
  helperText?: string;
}

import { cn } from '@/utils/cn';
export const FormTextarea: React.FC<FormTextareaProps> = ({ name, label, helperText, className, id, ...props }) => {
  const { control } = useFormContext();
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          {label && (
            <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {label}
            </label>
          )}
          <textarea
            id={textareaId}
            className={cn(
              'w-full rounded-xl border bg-white dark:bg-dark-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[100px]',
              error?.message
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-dark-600 focus:border-primary-500 dark:focus:border-primary-400',
              className
            )}
            {...props}
            {...field}
          />
          {error?.message && <p className="mt-1.5 text-xs text-red-500">{error.message}</p>}
          {helperText && !error?.message && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
        </div>
      )}
    />
  );
};

export interface FormCheckboxProps {
  name: string;
  label?: string;
  className?: string;
}

import { Checkbox } from '../ui/Checkbox';
export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, className }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
        <Checkbox
          {...field}
          label={label}
          checked={!!value}
          onChange={onChange}
          error={error?.message}
          className={className}
        />
      )}
    />
  );
};
