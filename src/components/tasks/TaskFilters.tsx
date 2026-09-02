import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import {
  TaskFilters,
  TaskStatus,
  Priority,
} from '@/types/task';
import { taskApi } from '@/services/api';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFilterChange: (filters: Partial<TaskFilters>) => void;
}

const TaskFiltersComponent: React.FC<TaskFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [assignees, setAssignees] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const loadAssignees = async () => {
      const response = await taskApi.getAssignees();

      if (response.success) {
        setAssignees(response.data);
      }
    };

    loadAssignees();
  }, []);

  const selectClassName = `
  rounded-lg
  border
  border-gray-300
  bg-white
  px-3
  py-2
  text-sm
  text-gray-700
  outline-none
  transition-all

  hover:border-gray-400
  hover:bg-gray-50

  focus-visible:border-blue-500
  focus-visible:ring-2
  focus-visible:ring-blue-500/20
  focus-visible:outline-none

  active:border-blue-600

  disabled:cursor-not-allowed
  disabled:bg-gray-100
  disabled:text-gray-400
  disabled:opacity-60
`;


  const FilterContent = () => (
    <div className="flex flex-wrap gap-3">
      {/* Status Filter */}
      <select
        className={selectClassName}
        value={filters.status || ''}
        onChange={(e) =>
          onFilterChange({
            status:
              (e.target.value as TaskStatus) || undefined,
          })
        }
        aria-label="Filter by status"
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
      </select>

      {/* Priority Filter */}
      <select
        className={selectClassName}
        value={filters.priority || ''}
        onChange={(e) =>
          onFilterChange({
            priority:
              (e.target.value as Priority) || undefined,
          })
        }
        aria-label="Filter by priority"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>

      {/* Assignee Filter */}
      <select
        className={selectClassName}
        value={filters.assignee || ''}
        onChange={(e) =>
          onFilterChange({
            assignee: e.target.value || undefined,
          })
        }
        aria-label="Filter by assignee"
      >
        <option value="">All Assignees</option>

        {assignees.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {/* Sort By */}
      <select
        className={selectClassName}
        value={filters.sortBy || 'createdAt'}
        onChange={(e) =>
          onFilterChange({
            sortBy: e.target.value as TaskFilters['sortBy'],
          })
        }
        aria-label="Sort tasks by"
      >
        <option value="createdAt">Sort by Created</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="title">Sort by Title</option>
        <option value="priority">Sort by Priority</option>
        <option value="status">Sort by Status</option>
      </select>

      {/* Sort Order */}
      <select
        className={selectClassName}
        value={filters.sortOrder || 'desc'}
        onChange={(e) =>
          onFilterChange({
            sortOrder: e.target.value as 'asc' | 'desc',
          })
        }
        aria-label="Sort order"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      {/* Clear Filters */}
      <button
        type="button"
        onClick={() =>
          onFilterChange({
            status: undefined,
            priority: undefined,
            assignee: undefined,
            sortBy: 'createdAt',
            sortOrder: 'desc',
          })
        }
        className="
          flex
          items-center
          gap-2
          rounded-lg
          px-3
          py-2
          text-sm
          font-medium
          text-gray-600
          outline-none
          transition-all

          hover:bg-blue-50
          hover:text-blue-600

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2

          active:bg-blue-100
          active:text-blue-700

          disabled:cursor-not-allowed
          disabled:opacity-50
        "

      >
        <X className="h-4 w-4" />
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      {/* Desktop Filters */}
      <div className="hidden md:block">
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() =>
            setIsMobileFilterOpen((prev) => !prev)
          }
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-lg
            bg-blue-50
            px-4
            py-2
            text-sm
            font-medium
            text-blue-600
            outline-none
            transition-all

            hover:bg-blue-100
            hover:text-blue-700

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2

            active:bg-blue-200
            active:text-blue-800

            disabled:cursor-not-allowed
            disabled:opacity-50
          "

          aria-expanded={isMobileFilterOpen}
          aria-label="Toggle filters"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </span>

          {isMobileFilterOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {isMobileFilterOpen && (
          <div className="mt-3">
            <FilterContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFiltersComponent;
