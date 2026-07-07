import React from 'react';
import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-t-transparent border-primary-600 dark:border-primary-400',
          sizes[size]
        )}
      />
    </div>
  );
};
export default LoadingSpinner;
