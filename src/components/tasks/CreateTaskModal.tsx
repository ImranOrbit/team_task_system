import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Loader2,
  FileText,
  User,
  CircleDot,
  Flag,
  CalendarDays,
  AlignLeft,
} from "lucide-react";
import { Task, TaskStatus, Priority } from "@/types/task";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsSubmitting(true);

    try {
      const newTask = {
        title: title.trim(),
        description: description.trim() || undefined,
        assignee: assignee.trim() || undefined,
        status,
        priority,
        dueDate: dueDate || undefined,
      };

      await onCreate(newTask);
      handleClose();
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setTitle("");
    setDescription("");
    setAssignee("");
    setStatus("todo");
    setPriority("medium");
    setDueDate("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        p-3
        sm:p-4
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-task-title"
    >
      {/* Modal */}
      <div
        className="
          flex
          w-full
          max-w-lg
          max-h-[calc(100vh-24px)]
          sm:max-h-[90vh]
          flex-col
          overflow-hidden
          rounded-xl
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-gray-200
            px-5
            py-4
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-blue-50
                text-blue-600
              "
            >
              <Plus className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </div>

            <div>
              <h2
                id="create-task-title"
                className="text-base font-semibold text-gray-900 sm:text-lg"
              >
                Create New Task
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                Add a new piece of work to the team backlog.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-gray-400
              transition-colors
              hover:bg-gray-100
              hover:text-gray-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close modal"
          >
            <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="overflow-y-auto px-5 py-5 sm:px-6">
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="task-title"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Task title
                  <span className="ml-1 text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>

                <div className="relative">
                  <FileText
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-gray-400
                    "
                    aria-hidden="true"
                  />

                  <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Redesign onboarding flow"
                    autoFocus
                    required
                    maxLength={200}
                    className="
                      h-11
                      w-full
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      pl-10
                      pr-3
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      hover:border-gray-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                    "
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="task-description"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Description
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    Optional
                  </span>
                </label>

                <div className="relative">
                  <AlignLeft
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-3
                      h-4
                      w-4
                      text-gray-400
                    "
                    aria-hidden="true"
                  />

                  <textarea
                    id="task-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add context, requirements, or useful links..."
                    rows={4}
                    maxLength={1000}
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      py-2.5
                      pl-10
                      pr-3
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      hover:border-gray-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                    "
                  />
                </div>
              </div>

              {/* Assignee */}
              <div>
                <label
                  htmlFor="task-assignee"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Assignee
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    Optional
                  </span>
                </label>

                <div className="relative">
                  <User
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-gray-400
                    "
                    aria-hidden="true"
                  />

                  <input
                    id="task-assignee"
                    type="text"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    maxLength={100}
                    className="
                      h-11
                      w-full
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      pl-10
                      pr-3
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      hover:border-gray-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                    "
                  />
                </div>
              </div>

              {/* Status & Priority */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Status */}
                <div>
                  <label
                    htmlFor="task-status"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>

                  <div className="relative">
                    <CircleDot
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        z-10
                        h-4
                        w-4
                        -translate-y-1/2
                        text-gray-400
                      "
                      aria-hidden="true"
                    />

                    <select
                      id="task-status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as TaskStatus)}
                      className="
                        h-11
                        w-full
                        appearance-none
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        pl-10
                        pr-3
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        hover:border-gray-400
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                      "
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label
                    htmlFor="task-priority"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Priority
                  </label>

                  <div className="relative">
                    <Flag
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        z-10
                        h-4
                        w-4
                        -translate-y-1/2
                        text-gray-400
                      "
                      aria-hidden="true"
                    />

                    <select
                      id="task-priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className="
                        h-11
                        w-full
                        appearance-none
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        pl-10
                        pr-3
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        hover:border-gray-400
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                      "
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label
                  htmlFor="task-due-date"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Due date
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    Optional
                  </span>
                </label>

                <div className="relative">
                  <CalendarDays
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-gray-400
                    "
                    aria-hidden="true"
                  />

                  <input
                    id="task-due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="
                      h-11
                      w-full
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      pl-10
                      pr-3
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      hover:border-gray-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              flex
              shrink-0
              flex-col-reverse
              gap-3
              border-t
              border-gray-200
              bg-gray-50/80
              px-5
              py-4
              sm:flex-row
              sm:justify-end
              sm:px-6
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                rounded-lg
                border
                border-gray-300
                bg-white
                px-5
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                hover:border-gray-400
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-blue-600
                px-5
                text-sm
                font-medium
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
                active:bg-blue-800
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-500
                focus-visible:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Creating...
                </>
              ) : (
                <>
                  <Plus
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
