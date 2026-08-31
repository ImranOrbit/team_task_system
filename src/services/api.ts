import { Task, TaskFilters, PaginatedResponse } from '@/types/task';
import { db } from './mockDatabase';

const simulateNetworkDelay = () => {
  return new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
};

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  metadata?: {
    timestamp: string;
    queryTime?: number;
  };
}

export const taskApi = {
  getTasks: async (filters: TaskFilters = {}): Promise<ApiResponse<PaginatedResponse<Task>>> => {
    await simulateNetworkDelay();
    
    try {
      const result = db.query(filters);
      return {
        success: true,
        data: result,
        metadata: {
          timestamp: new Date().toISOString(),
          queryTime: result.metadata.queryTime
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          data: [],
          pagination: {
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false
          },
          metadata: {
            queryTime: 0,
            timestamp: new Date().toISOString()
          }
        },
        error: error instanceof Error ? error.message : 'Failed to fetch tasks'
      };
    }
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    await simulateNetworkDelay();
    try {
      const newTask = db.create(task);
      return {
        success: true,
        data: newTask,
        metadata: { timestamp: new Date().toISOString() }
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        error: error instanceof Error ? error.message : 'Failed to create task'
      };
    }
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    await simulateNetworkDelay();
    try {
      const updated = db.update(id, updates);
      if (!updated) {
        return {
          success: false,
          data: null as any,
          error: 'Task not found'
        };
      }
      return {
        success: true,
        data: updated,
        metadata: { timestamp: new Date().toISOString() }
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        error: error instanceof Error ? error.message : 'Failed to update task'
      };
    }
  },

  deleteTask: async (id: string) => {
    await simulateNetworkDelay();
    try {
      const deleted = db.delete(id);
      if (!deleted) {
        return {
          success: false,
          data: null as any,
          error: 'Task not found'
        };
      }
      return {
        success: true,
        data: { id, deleted: true },
        metadata: { timestamp: new Date().toISOString() }
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        error: error instanceof Error ? error.message : 'Failed to delete task'
      };
    }
  },

  getAssignees: async () => {
    await simulateNetworkDelay();
    return {
      success: true,
      data: db.getAssignees(),
      metadata: { timestamp: new Date().toISOString() }
    };
  }
};