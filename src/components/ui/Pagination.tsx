import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'
          )}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="left-ellipsis" className="flex h-9 w-9 items-center justify-center text-gray-400 dark:text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 border',
            isActive
              ? 'border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500 shadow-sm'
              : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'
          )}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="right-ellipsis" className="flex h-9 w-9 items-center justify-center text-gray-400 dark:text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'
          )}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav className={cn('flex items-center justify-center gap-2 py-4', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-200 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-200 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};
export default Pagination;
