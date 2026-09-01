import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TaskPaginationProps {
  pagination: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onPageChange: (page: number) => void;
}

const TaskPagination: React.FC<TaskPaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }

        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');

        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');

        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }

        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const buttonBase =
    'flex items-center justify-center rounded-lg border text-sm transition-colors';

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {/* Previous Page */}
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrev}
        aria-label="Previous page"
        className={`
          ${buttonBase}
          h-10
          gap-1
          border-gray-300
          bg-white
          px-3
          text-gray-700
          hover:border-blue-500
          hover:bg-blue-50
          hover:text-blue-600
          disabled:cursor-not-allowed
          disabled:opacity-50
          disabled:hover:border-gray-300
          disabled:hover:bg-white
          disabled:hover:text-gray-700
        `}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((p, index) => (
        <button
          key={`${p}-${index}`}
          type="button"
          onClick={() => {
            if (typeof p === 'number') {
              onPageChange(p);
            }
          }}
          disabled={p === '...'}
          aria-current={p === page ? 'page' : undefined}
          className={`
            ${buttonBase}
            h-10
            min-w-10
            px-3
            ${
              p === page
                ? 'border-blue-500 bg-blue-500 text-white shadow-sm hover:bg-blue-600'
                : p === '...'
                ? 'cursor-default border-transparent bg-transparent text-gray-500'
                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
            }
          `}
        >
          {p}
        </button>
      ))}

      {/* Next Page */}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        aria-label="Next page"
        className={`
          ${buttonBase}
          h-10
          gap-1
          border-gray-300
          bg-white
          px-3
          text-gray-700
          hover:border-blue-500
          hover:bg-blue-50
          hover:text-blue-600
          disabled:cursor-not-allowed
          disabled:opacity-50
          disabled:hover:border-gray-300
          disabled:hover:bg-white
          disabled:hover:text-gray-700
        `}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TaskPagination;
