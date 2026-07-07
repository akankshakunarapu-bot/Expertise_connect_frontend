import React from 'react';
import { cn } from '@/utils/cn';
import { getInitials } from '@/utils/formatters';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isOnline?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  isOnline = false,
  className,
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
    '2xl': 'w-32 h-32 text-4xl',
  };

  const badgeSizes = {
    xs: 'w-1.5 h-1.5 border',
    sm: 'w-2 h-2 border-2',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-4 h-4 border-2',
    xl: 'w-5 h-5 border-4',
    '2xl': 'w-6 h-6 border-4',
  };

  const initials = getInitials(name);

  return (
    <div className={cn('relative inline-block shrink-0 select-none', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover border border-gray-100 dark:border-dark-700', sizes[size])}
          onError={(e) => {
            // Remove src if image fails to load so it falls back to initials
            (e.target as HTMLImageElement).src = '';
          }}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-semibold bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300 border border-primary-200 dark:border-primary-900',
            sizes[size]
          )}
        >
          {initials}
        </div>
      )}
      {isOnline && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full bg-emerald-500 border-white dark:border-dark-800',
            badgeSizes[size]
          )}
        />
      )}
    </div>
  );
};
export default Avatar;
