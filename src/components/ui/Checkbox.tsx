import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, onChange, error, id, disabled, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col">
        <label
          htmlFor={checkboxId}
          className={cn(
            'inline-flex items-center gap-3 cursor-pointer select-none text-sm text-gray-700 dark:text-gray-300 font-medium',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              checked={checked}
              onChange={(e) => !disabled && onChange(e.target.checked)}
              disabled={disabled}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                'flex h-5.5 w-5.5 items-center justify-center rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 transition-all duration-150 peer-checked:bg-primary-600 peer-checked:border-primary-600 dark:peer-checked:bg-primary-500 dark:peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/20',
                error && 'border-red-500',
                checked && 'text-white'
              )}
            >
              {checked && <Check className="h-4.5 w-4.5 stroke-3" />}
            </div>
          </div>
          {label && <span>{label}</span>}
        </label>
        {error && <p className="mt-1 text-xs text-red-500 pl-8.5">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
