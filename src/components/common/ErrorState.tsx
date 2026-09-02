import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
        {/* Error Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-7 w-7 text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">
          Something went wrong
        </h2>

        {/* Error Message */}
        <p className="mt-2 text-sm leading-6 text-gray-600">
          {message}
        </p>

        {/* Retry Button */}
        <button
          type="button"
          onClick={onRetry}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition-colors
            hover:bg-blue-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
            active:bg-blue-800
          "
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
