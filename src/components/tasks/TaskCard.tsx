import React, { useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Circle,
  Eye,
  Flag,
  ListTodo,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import { Task } from '@/types/task';
import { taskApi } from '@/services/api';

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
  onOpenTask: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onUpdate,
  onOpenTask,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const statusColors = {
    todo: 'bg-slate-100 text-slate-700 border-slate-200',
    'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
    review: 'bg-violet-50 text-violet-700 border-violet-200',
    done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const priorityColors = {
    low: 'bg-red-50 text-red-700 border-red-300',
    medium: 'bg-yellow-50 text-yellow-800 border-yellow-300',
    high: 'bg-green-50 text-green-700 border-green-300',
    urgent: 'bg-orange-50 text-orange-700 border-orange-300',
  };

  const statusIcons = {
    todo: <ListTodo className="h-3.5 w-3.5" />,
    'in-progress': <Zap className="h-3.5 w-3.5" />,
    review: <Eye className="h-3.5 w-3.5" />,
    done: <CheckCircle2 className="h-3.5 w-3.5" />,
  };

  const priorityIcons = {
    low: (
      <Circle className="h-3 w-3 fill-current text-red-500" />
    ),
    medium: (
      <Flag className="h-3.5 w-3.5 text-yellow-500" />
    ),
    high: (
      <Flag className="h-3.5 w-3.5 text-green-500" />
    ),
    urgent: (
      <AlertCircle className="h-3.5 w-3.5 text-orange-500" />
    ),
  };


  /* =========================================================
     OPEN TASK
  ========================================================= */

  const handleOpenTask = () => {
    if (isUpdating) return;

    onOpenTask(task.id);
  };


  /* =========================================================
     KEYBOARD ACCESSIBILITY
  ========================================================= */

  const handleTaskKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      handleOpenTask();
    }
  };


  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = async (
    newStatus: Task['status']
  ) => {
    setIsUpdating(true);

    try {
      await taskApi.updateTask(task.id, {
        status: newStatus,
      });

      onUpdate();
    } catch (error) {
      console.error(
        'Failed to update task status:',
        error
      );
    } finally {
      setIsUpdating(false);
    }
  };


  /* =========================================================
     DELETE TASK
  ========================================================= */

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${task.title}"?`)) {
      return;
    }

    setIsUpdating(true);

    try {
      await taskApi.deleteTask(task.id);

      onUpdate();
    } catch (error) {
      console.error(
        'Failed to delete task:',
        error
      );
    } finally {
      setIsUpdating(false);
    }
  };


  /* =========================================================
     DATE
  ========================================================= */

  const dueDate = task.dueDate
    ? new Date(task.dueDate)
    : null;

  const isOverdue =
    dueDate !== null &&
    dueDate < new Date();


  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open task: ${task.title}`}
      onClick={handleOpenTask}
      onKeyDown={handleTaskKeyDown}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      className="
        cursor-pointer
        rounded-lg
        border
        border-gray-100
        bg-white
        p-4
        shadow-sm
        transition-all

        hover:border-blue-200
        hover:shadow-md

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500
        focus-visible:ring-offset-2

        sm:p-4
      "
    >

      {/* Header */}

      <div className="mb-2 flex items-start justify-between gap-3">

        <h3
          className="
            min-w-0
            flex-1
            text-sm
            font-semibold
            leading-5
            text-gray-900
          "
        >
          {task.title}
        </h3>


        <span
          className={`
            inline-flex
            shrink-0
            items-center
            gap-1
            rounded-full
            border
            px-2
            py-1
            text-xs
            font-medium
            capitalize
            ${priorityColors[task.priority]}
          `}
        >

          {priorityIcons[task.priority]}

          {task.priority}

        </span>

      </div>


      {/* Description */}

      {task.description && (
        <p
          className="
            mb-3
            line-clamp-2
            text-sm
            leading-5
            text-gray-600
          "
        >
          {task.description}
        </p>
      )}


      {/* Assignee */}

      {task.assignee && (
        <div
          className="
            mb-2
            flex
            items-center
            gap-2
            text-sm
            text-gray-600
          "
        >

          <User
            className="
              h-4
              w-4
              shrink-0
              text-gray-400
            "
            aria-hidden="true"
          />

          <span className="truncate">
            {task.assignee}
          </span>

        </div>
      )}


      {/* Due Date */}

      {dueDate && (
        <div
          className="
            mb-3
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-gray-600
          "
        >

          <CalendarDays
            className="
              h-4
              w-4
              shrink-0
              text-gray-400
            "
            aria-hidden="true"
          />

          <span>
            {dueDate.toLocaleDateString()}
          </span>


          {isOverdue && (
            <span
              className="
                ml-1
                inline-flex
                items-center
                gap-1
                text-xs
                font-medium
                text-red-600
              "
            >

              <AlertCircle
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />

              Overdue

            </span>
          )}

        </div>
      )}


      {/* Footer */}

      <div
        className="
          mt-3
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-gray-100
          pt-3
        "
      >

        {/* Status */}

        <div
          className="relative"
          onClick={(event) => {
            event.stopPropagation();
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
        >

          <select
            className={`
              appearance-none
              rounded-lg
              border
              px-3
              py-1.5
              pr-8
              text-xs
              font-medium
              outline-none
              transition

              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20

              disabled:cursor-not-allowed
              disabled:opacity-60

              ${statusColors[task.status]}
            `}
            value={task.status}
            onChange={(e) =>
              handleStatusChange(
                e.target.value as Task['status']
              )
            }
            disabled={isUpdating}
            aria-label="Task status"
          >

            <option value="todo">
              Todo
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="review">
              Review
            </option>

            <option value="done">
              Done
            </option>

          </select>


          <div
            className="
              pointer-events-none
              absolute
              right-2
              top-1/2
              -translate-y-1/2
            "
          >
            {statusIcons[task.status]}
          </div>

        </div>


        {/* Created Date & Delete */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-2
          "
        >

          <span
            className="
              truncate
              text-xs
              text-gray-400
            "
          >
            {new Date(
              task.createdAt
            ).toLocaleDateString()}
          </span>


          {showDelete && !isUpdating && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleDelete();
              }}
              onKeyDown={(event) => {
                event.stopPropagation();
              }}
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-md
                text-gray-400
                transition-colors

                hover:bg-red-50
                hover:text-red-600

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
              "
              aria-label="Delete task"
              title="Delete task"
            >

              <Trash2
                className="h-4 w-4"
                aria-hidden="true"
              />

            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default TaskCard;