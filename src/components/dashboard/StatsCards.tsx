import React, { useMemo } from 'react';
import {
  BarChart3,
  ClipboardList,
  Zap,
  Eye,
  CheckCircle2,
  UserX,
  AlertCircle,
} from 'lucide-react';
import { Task } from '@/types/task';

interface StatsCardsProps {
  tasks: Task[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;

    const todo = tasks.filter(
      (task) => task.status === 'todo'
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === 'in-progress'
    ).length;

    const review = tasks.filter(
      (task) => task.status === 'review'
    ).length;

    const done = tasks.filter(
      (task) => task.status === 'done'
    ).length;

    const unassigned = tasks.filter(
      (task) => !task.assignee
    ).length;

    const overdue = tasks.filter((task) => {
      if (!task.dueDate) return false;

      const dueDate = new Date(task.dueDate);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);

      return dueDate < today && task.status !== 'done';
    }).length;

    return {
      total,
      todo,
      inProgress,
      review,
      done,
      unassigned,
      overdue,
    };
  }, [tasks]);

  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: BarChart3,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      valueColor: 'text-gray-900',
    },
    {
      label: 'To Do',
      value: stats.todo,
      icon: ClipboardList,
      iconColor: 'text-gray-600',
      iconBg: 'bg-gray-100',
      valueColor: 'text-gray-900',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Zap,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      valueColor: 'text-blue-700',
    },
    {
      label: 'Review',
      value: stats.review,
      icon: Eye,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      valueColor: 'text-purple-700',
    },
    {
      label: 'Done',
      value: stats.done,
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      valueColor: 'text-emerald-700',
    },
    {
      label: 'Unassigned',
      value: stats.unassigned,
      icon: UserX,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      valueColor: 'text-amber-700',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-50',
      valueColor: 'text-red-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="
              group
              bg-white
              border
              border-gray-200
              rounded-xl
              p-4
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
              hover:border-gray-300
            "
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className={`
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  ${card.iconBg}
                  ${card.iconColor}
                  transition-transform
                  duration-200
                  group-hover:scale-105
                `}
              >
                <Icon
                  className="h-5 w-5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <span
                className={`
                  text-2xl
                  font-bold
                  tracking-tight
                  ${card.valueColor}
                `}
              >
                {card.value}
              </span>
            </div>

            <p
              className="
                mt-3
                text-xs
                font-medium
                text-gray-500
                truncate
              "
              title={card.label}
            >
              {card.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
