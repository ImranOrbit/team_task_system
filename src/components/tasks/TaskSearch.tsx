import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface TaskSearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const TaskSearch: React.FC<TaskSearchProps> = ({
  onSearch,
  initialValue = '',
}) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="h-5 w-5" />
      </div>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search tasks by title, description, or assignee..."
        autoComplete="off"
        aria-label="Search tasks"
        className="
          w-full
          h-12
          pl-10
          pr-10
          border
          border-gray-300
          rounded-lg
          bg-white
          text-sm
          text-gray-900
          placeholder:text-gray-400
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20

          [&::-webkit-search-cancel-button]:appearance-none
          [&::-webkit-search-decoration]:appearance-none
          [&::-ms-clear]:hidden
        "
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClear}
          className="
            absolute
            right-2
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-md
            text-gray-400
            transition-colors
            hover:bg-gray-100
            hover:text-gray-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
          aria-label="Clear search"
          title="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default TaskSearch;
