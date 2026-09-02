import React, { useEffect, useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskFilters } from '@/types/task';
import { db } from '@/services/mockDatabase';
import TaskList from '@/components/tasks/TaskList';
import TaskFiltersComponent from '@/components/tasks/TaskFilters';
import TaskSearch from '@/components/tasks/TaskSearch';
import TaskPagination from '@/components/tasks/TaskPagination';
import StatsCards from '@/components/dashboard/StatsCards';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '@/components/common/ErrorState';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import TaskDetails from '@/components/tasks/TaskDetails';
import { ClipboardList, Plus } from 'lucide-react';

/* =========================================================
   URL CHANGE #1
   Read filters/search/sort/page/task from URL
========================================================= */

const getFiltersFromURL = (): TaskFilters => {
  const params = new URLSearchParams(window.location.search);

  return {
    page: Number(params.get('page')) || 1,
    limit: 20,

    search: params.get('search') || undefined,

    status:
      (params.get('status') as TaskFilters['status']) || undefined,

    priority:
      (params.get('priority') as TaskFilters['priority']) || undefined,

    assignee: params.get('assignee') || undefined,

    overdue:
      params.get('overdue') === 'true' || undefined,

    sortBy:
      (params.get('sortBy') as TaskFilters['sortBy']) || 'createdAt',

    sortOrder:
      (params.get('sortOrder') as 'asc' | 'desc') || 'desc',
  };
};

/* =========================================================
   URL CHANGE #2
   Convert current filters into URL
========================================================= */

const updateURL = (
  filters: TaskFilters,
  replace = false
) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set('search', filters.search);
  }

  if (filters.status) {
    params.set('status', filters.status);
  }

  if (filters.priority) {
    params.set('priority', filters.priority);
  }

  if (filters.assignee) {
    params.set('assignee', filters.assignee);
  }

  if (filters.overdue) {
    params.set('overdue', 'true');
  }

  if (filters.sortBy && filters.sortBy !== 'createdAt') {
    params.set('sortBy', filters.sortBy);
  }

  if (filters.sortOrder && filters.sortOrder !== 'desc') {
    params.set('sortOrder', filters.sortOrder);
  }

  if (filters.page && filters.page !== 1) {
    params.set('page', String(filters.page));
  }

  const queryString = params.toString();

  const newURL = queryString
    ? `/tasks?${queryString}`
    : '/tasks';

  if (replace) {
    window.history.replaceState({}, '', newURL);
  } else {
    window.history.pushState({}, '', newURL);
  }
};

function App() {
  /* =========================================================
     URL CHANGE #3
     Initial filters URL
  ========================================================= */

  const [filters, setFilters] = useState<TaskFilters>(() =>
    getFiltersFromURL()
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* =========================================================
     TASK DETAILS
  ========================================================= */

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);

    return params.get('task');
  });

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  const [initialLoading, setInitialLoading] = useState(true);

  const {
    tasks,
    loading,
    error,
    pagination,
    refetch,
  } = useTasks(filters);

  /* =========================================================
     Mark initial loading as completed
  ========================================================= */

  useEffect(() => {
    if (!loading) {
      setInitialLoading(false);
    }
  }, [loading]);

  /* =========================================================
     URL CHANGE #5
     Filter change
  ========================================================= */

  const handleFilterChange = (
    newFilters: Partial<TaskFilters>
  ) => {
    setFilters((prev) => {
      const updatedFilters: TaskFilters = {
        ...prev,
        ...newFilters,
        page: 1,
      };

      updateURL(updatedFilters);

      return updatedFilters;
    });
  };

  /* =========================================================
     URL CHANGE #6
     Pagination change
  ========================================================= */

  const handlePageChange = (page: number) => {
    setFilters((prev) => {
      const updatedFilters: TaskFilters = {
        ...prev,
        page,
      };

      updateURL(updatedFilters);

      return updatedFilters;
    });
  };

  /* =========================================================
     URL CHANGE #7
     Search change
  ========================================================= */

    const handleSearch = (search: string) => {
      setFilters((prev) => {
        const updatedFilters: TaskFilters = {
          ...prev,
          search: search || undefined,
          page: 1,
        };

        updateURL(updatedFilters, true);

        return updatedFilters;
      });
    };


  /* =========================================================
     TASK OPEN
  ========================================================= */

  const handleOpenTask = (taskId: string) => {
    const params = new URLSearchParams(window.location.search);

    params.set('task', taskId);

    const queryString = params.toString();

    window.history.pushState(
      {},
      '',
      queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname
    );

    setSelectedTaskId(taskId);
  };

  /* =========================================================
     TASK CLOSE
  ========================================================= */

  const handleCloseTask = () => {
    const params = new URLSearchParams(window.location.search);

    params.delete('task');

    const queryString = params.toString();

    window.history.pushState(
      {},
      '',
      queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname
    );

    setSelectedTaskId(null);
  };

  /* =========================================================
     Browser Back / Forward support
  ========================================================= */

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);

      const taskId = params.get('task');

      setSelectedTaskId(taskId);

      if (!taskId) {
        setFilters(getFiltersFromURL());
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  /* =========================================================
     Selected Task
  ========================================================= */

  const selectedTask = selectedTaskId
    ? db.getById(selectedTaskId)
    : null;

  /* =========================================================
     Create Task
  ========================================================= */

  const handleCreateTask = (newTask: any) => {
    db.create(newTask);

    refetch();

    setIsModalOpen(false);
  };

  /* =========================================================
     TASK DETAILS PAGE
  ========================================================= */

  if (selectedTaskId && selectedTask) {
    return (
      <TaskDetails
        task={selectedTask}
        onBack={handleCloseTask}
      />
    );
  }

  /* =========================================================
     INITIAL Loading
  ========================================================= */

  if (initialLoading) {
    return (
      <LoadingSpinner message="Loading tasks..." />
    );
  }

  /* =========================================================
     Error
  ========================================================= */

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-6">

        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
                <ClipboardList className="h-8 w-8 text-blue-600" />
                Team Task System
              </h1>

              <p className="mt-1 text-gray-600">
                Manage your team's work efficiently
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-blue-500
                px-4
                py-2
                font-medium
                text-white
                shadow-sm
                transition-colors
                hover:bg-blue-600
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-500
                focus-visible:ring-offset-2
              "
            >
              <Plus className="h-5 w-5" />
              New Task
            </button>

          </div>
        </header>

        {/* Stats */}
        <StatsCards tasks={tasks} />

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">

          <TaskSearch
            onSearch={handleSearch}
            initialValue={filters.search || ''}
          />

          <TaskFiltersComponent
            filters={filters}
            onFilterChange={handleFilterChange}
          />

        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onTaskUpdate={refetch}
          onOpenTask={handleOpenTask}
        />

        {/* Pagination */}
        <TaskPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />

        {/* Create Task Modal */}
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateTask}
        />

      </div>
    </div>
  );
}

export default App;