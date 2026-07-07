import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '@/utils/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number; // percentage change e.g. 12.5 or -5.2
  timeframe?: string; // e.g. "from last month"
  icon: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  timeframe = 'from last month',
  icon,
  className,
}) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className={cn('flex flex-col justify-between hover:shadow-md transition-all duration-200', className)}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 shrink-0">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {value}
        </h3>
        {change !== undefined && (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium',
                isPositive
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                  : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400'
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 shrink-0" />
              ) : (
                <ArrowDownRight className="h-3 w-3 shrink-0" />
              )}
              {Math.abs(change)}%
            </span>
            <span className="text-gray-500 dark:text-gray-400">{timeframe}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
export default StatCard;
