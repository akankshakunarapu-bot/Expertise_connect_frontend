import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/utils/cn';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-950/30',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/40 text-red-650 dark:text-red-400 mb-4 shrink-0 animate-bounce-gentle">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-red-800 dark:text-red-400 mb-1">
        {title}
      </h3>
      <p className="text-sm text-red-600 dark:text-red-500 max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button variant="danger" size="md" onClick={onRetry}>
          Retry Process
        </Button>
      )}
    </div>
  );
};
export default ErrorState;
