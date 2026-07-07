import React from 'react';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  value: number; // percentage 0-100
  max?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  barClassName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showValue = false,
  size = 'md',
  className,
  barClassName,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-1.5">
        {showValue && (
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div
        className={cn(
          'w-full bg-gray-100 dark:bg-dark-700 rounded-full overflow-hidden border border-gray-200/20 dark:border-dark-700/20',
          heights[size]
        )}
      >
        <div
          className={cn(
            'bg-gradient-to-r from-primary-600 to-accent-600 h-full rounded-full transition-all duration-500 ease-out',
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;
