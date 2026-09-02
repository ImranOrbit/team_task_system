import React from 'react';
import {
  ArrowLeft,
  CalendarDays,
  User,
  Flag,
  CircleDot,
  FileText,
  Clock,
  CheckCircle2,
  ListTodo,
  Eye,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { Task } from '@/types/task';

interface TaskDetailsProps {
  task: Task;
  onBack: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  onBack,
}) => {
  const statusConfig = {
    todo: {
      label: 'Todo',
      icon: <ListTodo className="h-4 w-4" />,
      className:
        'border-slate-200 bg-slate-100 text-slate-700',
    },
    'in-progress': {
      label: 'In Progress',
      icon: <Zap className="h-4 w-4" />,
      className:
        'border-blue-200 bg-blue-50 text-blue-700',
    },
    review: {
      label: 'Review',
      icon: <Eye className="h-4 w-4" />,
      className:
        'border-violet-200 bg-violet-50 text-violet-700',
    },
    done: {
      label: 'Done',
      icon: <CheckCircle2 className="h-4 w-4" />,
      className:
        'border-emerald-200 bg-emerald-50 text-emerald-700',
    },
  };

  const priorityConfig = {
    low: 'border-slate-200 bg-slate-50 text-slate-700',
    medium: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    high: 'border-green-200 bg-green-50 text-green-700',
    urgent: 'border-orange-200 bg-orange-50 text-orange-700',
  };

  const dueDate = task.dueDate
    ? new Date(task.dueDate)
    : null;

  const isOverdue =
    dueDate !== null &&
    dueDate < new Date() &&
    task.status !== 'done';

  const status = statusConfig[task.status];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-8">

        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="
            mb-5
            inline-flex
            min-h-10
            items-center
            gap-2
            rounded-lg
            border
            border-gray-300
            bg-white
            px-3
            py-2
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            outline-none
            transition-all

            hover:border-gray-400
            hover:bg-gray-50

            active:bg-gray-100

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
          "
          aria-label="Back to task list"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tasks
        </button>

        {/* Main Card */}
        <article
          className="
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          {/* Header */}
          <div
            className="
              border-b
              border-gray-200
              px-4
              py-5
              sm:px-6
              sm:py-6
              lg:px-8
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Task details
                </p>

                <h1
                  className="
                    break-words
                    text-xl
                    font-bold
                    leading-7
                    text-gray-900
                    sm:text-2xl
                    sm:leading-8
                    lg:text-3xl
                  "
                >
                  {task.title}
                </h1>
              </div>

              <span
                className={`
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  capitalize
                  ${priorityConfig[task.priority]}
                `}
              >
                <Flag className="h-3.5 w-3.5" />
                {task.priority}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

            {/* Status / Assignee / Due Date */}
            <div
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {/* Status */}
              <div
                className="
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  p-4
                "
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-500">
                  <CircleDot className="h-4 w-4" />
                  Status
                </div>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    ${status.className}
                  `}
                >
                  {status.icon}
                  {status.label}
                </span>
              </div>

              {/* Assignee */}
              <div
                className="
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  p-4
                "
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-500">
                  <User className="h-4 w-4" />
                  Assignee
                </div>

                <p
                  className="
                    break-words
                    text-sm
                    font-medium
                    text-gray-900
                  "
                >
                  {task.assignee || 'Unassigned'}
                </p>
              </div>

              {/* Due Date */}
              <div
                className="
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  p-4
                  sm:col-span-2
                  lg:col-span-1
                "
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-500">
                  <CalendarDays className="h-4 w-4" />
                  Due date
                </div>

                {dueDate ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {dueDate.toLocaleDateString()}
                    </p>

                    {isOverdue && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Overdue
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No due date
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <section className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />

                <h2 className="text-sm font-semibold text-gray-900">
                  Description
                </h2>
              </div>

              <div
                className="
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  p-4
                  sm:p-5
                "
              >
                {task.description ? (
                  <p
                    className="
                      whitespace-pre-wrap
                      break-words
                      text-sm
                      leading-6
                      text-gray-700
                    "
                  >
                    {task.description}
                  </p>
                ) : (
                  <p className="text-sm italic text-gray-400">
                    No description provided.
                  </p>
                )}
              </div>
            </section>

            {/* Dates */}
            <section
              className="
                mt-6
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  border
                  border-gray-200
                  p-4
                "
              >
                <Clock className="h-4 w-4 shrink-0 text-gray-400" />

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">
                    Created
                  </p>

                  <p className="break-words text-sm font-medium text-gray-900">
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  border
                  border-gray-200
                  p-4
                "
              >
                <Clock className="h-4 w-4 shrink-0 text-gray-400" />

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">
                    Last updated
                  </p>

                  <p className="break-words text-sm font-medium text-gray-900">
                    {new Date(task.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
};

export default TaskDetails;
