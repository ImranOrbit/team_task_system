import React from 'react';
import { ClipboardList } from 'lucide-react';
import { Task } from '@/types/task';
import TaskCard from '../tasks/TaskCard';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onTaskUpdate: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onTaskUpdate,
}) => {
  if (loading) {
    return null;
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg bg-white py-12 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <ClipboardList className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          No tasks found
        </h3>

        <p className="mt-2 text-gray-600">
          Try adjusting your filters or create a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onTaskUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
