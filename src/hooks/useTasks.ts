import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '@/services/api';
import { Task, TaskFilters } from '@/types/task';

export const useTasks = (filters: TaskFilters = {}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchTasks = useCallback(async () => {
    // Show the full loading state on the initial fetch
    if (tasks.length === 0) {
      setLoading(true);
    }

    // Show background fetching state for search and filter changes
    setIsFetching(true);
    setError(null);

    try {
      const response = await taskApi.getTasks(filters);

      if (response.success) {
        setTasks(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError(response.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const refetch = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    isFetching,
    error,
    pagination,
    refetch,
    isEmpty: !loading && tasks.length === 0,
  };
};
