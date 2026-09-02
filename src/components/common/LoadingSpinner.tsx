import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  return (
    <div className="min-h-[400px] w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              rounded-lg
              border
              border-gray-200
              bg-white
              p-4
              shadow-sm
            "
          >
            {/* TITLE + PRIORITY */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="h-4 w-40 animate-pulse rounded bg-gray-300" />
                <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-7 w-20 animate-pulse rounded-full bg-orange-100" />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-4 space-y-2">
              <div className="h-3.5 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3.5 w-11/12 animate-pulse rounded bg-gray-200" />
              <div className="h-3.5 w-3/5 animate-pulse rounded bg-gray-200" />
            </div>

            {/* ASSIGNEE */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-blue-100" />

              <div className="space-y-1.5">
                <div className="h-2.5 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-3.5 w-28 animate-pulse rounded bg-gray-300" />
              </div>
            </div>

            {/* DUE DATE */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-md bg-gray-100" />

              <div className="space-y-1.5">
                <div className="h-2.5 w-14 animate-pulse rounded bg-gray-200" />
                <div className="h-3.5 w-24 animate-pulse rounded bg-gray-300" />
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
              {/* STATUS */}
              <div className="h-8 w-28 animate-pulse rounded-lg bg-blue-100" />

              {/* CREATED DATE */}
              <div className="h-3.5 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
