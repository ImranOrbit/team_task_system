import React, { useState } from 'react';
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
import { ClipboardList, Plus } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tasks, loading, error, pagination, refetch } = useTasks(filters);

  const handleFilterChange = (newFilters: Partial<TaskFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSearch = (search: string) => {
    console.log('Searching for:', search);

    setFilters((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  };

  const handleCreateTask = (newTask: any) => {
    db.create(newTask);
    refetch();
    setIsModalOpen(false);
  };

  if (loading) {
    return <LoadingSpinner message="Loading tasks..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
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
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
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
