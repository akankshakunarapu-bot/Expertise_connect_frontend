import React from 'react';
import { cn } from '@/utils/cn';

interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const Radio: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  error,
  className,
  disabled,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {label}
        </span>
      )}
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = option.value === value;
          const optionId = `${name}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                'flex items-start gap-3 p-4 rounded-xl border cursor-pointer select-none transition-all duration-150 bg-white dark:bg-dark-800',
                isSelected
                  ? 'border-primary-600 dark:border-primary-500 ring-2 ring-primary-500/10'
                  : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="relative flex items-center h-5">
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => !disabled && onChange(option.value)}
                  disabled={disabled}
                  className="sr-only peer"
                />
                <div
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 transition-all duration-150 peer-checked:border-primary-600 dark:peer-checked:border-primary-500',
                    isSelected && 'text-primary-600 dark:text-primary-500'
                  )}
                >
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary-600 dark:bg-primary-500" />
                  )}
                </div>
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-normal">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
};
export default Radio;
