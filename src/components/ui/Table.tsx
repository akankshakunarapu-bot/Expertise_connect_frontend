import React from 'react';
import { cn } from '@/utils/cn';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  className?: string;
  rowClassName?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  className,
  rowClassName,
}: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-2xl border border-gray-100 dark:border-dark-700 bg-white dark:bg-dark-800 shadow-card', className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 dark:border-dark-700 bg-gray-50 dark:bg-dark-850">
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={cn(
                  'px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase whitespace-nowrap',
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
          {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className={cn(
                  'hover:bg-gray-50/50 dark:hover:bg-dark-700/30 transition-all duration-150',
                  rowClassName
                )}
              >
                {columns.map((column, idx) => (
                  <td
                    key={idx}
                    className={cn(
                      'px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap',
                      column.className
                    )}
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(row)
                      : (row[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
