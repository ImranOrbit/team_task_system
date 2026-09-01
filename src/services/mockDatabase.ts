import {
  Task,
  TaskStatus,
  Priority,
  TaskFilters,
  PaginatedResponse,
} from '@/types/task';
import { faker } from '@faker-js/faker';

export class MockDatabase {
  private tasks: Task[] = [];
  private seedCount: number = 500;

  constructor() {
    this.tasks = this.generateMockTasks(this.seedCount);
  }

  private generateMockTasks(count: number): Task[] {
    const statuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];
    const priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];

    return Array.from({ length: count }, (_, i) => ({
      id: `task-${i + 1}`,
      title: this.generateRealisticTitle(),
      description:
        Math.random() > 0.3 ? faker.lorem.paragraph() : undefined,
      assignee:
        Math.random() > 0.2 ? this.generateRealisticName() : undefined,
      status:
        statuses[Math.floor(Math.random() * statuses.length)],
      priority:
        priorities[Math.floor(Math.random() * priorities.length)],
      dueDate:
        Math.random() > 0.2
          ? this.generateRealisticDueDate()
          : undefined,
      createdAt: this.generateRealisticCreatedDate(),
      updatedAt: new Date().toISOString(),
    }));
  }

  private generateRealisticTitle(): string {
    const templates = [
      'Fix %s in %s',
      'Implement %s for %s',
      'Update %s module',
      'Add %s validation',
      'Optimize %s performance',
      'Create %s dashboard',
      'Migrate %s to %s',
      'Setup %s environment',
      'Debug %s issue',
      'Refactor %s component',
    ];

    const words = [
      'login',
      'payment',
      'profile',
      'search',
      'notifications',
      'analytics',
      'dashboard',
      'API',
      'database',
      'UI',
    ];

    const template =
      templates[Math.floor(Math.random() * templates.length)];

    return template.replace(
      /%s/g,
      () => words[Math.floor(Math.random() * words.length)]
    );
  }

  private generateRealisticName(): string {
    const names = [
      'Md. Rahim Khan',
      'Sakib Al Hasan',
      'Nadia Rahman',
      'Kamal Hossain',
      'Jannatul Ferdous',
      'Farhan Ahmed',
      'Tasnim Begum',
      'Christopher Jonathan Pennington',
      'Rafiq Islam',
      'Shakila Akter',
    ];

    return names[Math.floor(Math.random() * names.length)];
  }

  private generateRealisticDueDate(): string {
    const date = new Date();

    date.setDate(
      date.getDate() + Math.floor(Math.random() * 30) - 5
    );

    return date.toISOString().split('T')[0];
  }

  private generateRealisticCreatedDate(): string {
    const date = new Date();

    date.setDate(
      date.getDate() - Math.floor(Math.random() * 60)
    );

    return date.toISOString();
  }

  query(filters: TaskFilters = {}): PaginatedResponse<Task> {
    const startTime = performance.now();

    const {
      page = 1,
      limit = 20,
      status,
      priority,
      assignee,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    let result = [...this.tasks];

    if (status) {
      result = result.filter((task) => task.status === status);
    }

    if (priority) {
      result = result.filter((task) => task.priority === priority);
    }

    if (assignee) {
      result = result.filter((task) =>
        task.assignee
          ?.toLowerCase()
          .includes(assignee.toLowerCase())
      );
    }

    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();

      result = result.filter((task) => {
        const titleMatch = task.title
          .toLowerCase()
          .includes(searchLower);

        const descriptionMatch =
          task.description
            ?.toLowerCase()
            .includes(searchLower) || false;

        const assigneeMatch =
          task.assignee
            ?.toLowerCase()
            .includes(searchLower) || false;

        return titleMatch || descriptionMatch || assigneeMatch;
      });
    }

    result.sort((a: any, b: any) => {
      const valueA = a[sortBy] || '';
      const valueB = b[sortBy] || '';

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      }

      return valueA < valueB ? 1 : -1;
    });

    const total = result.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = result.slice(
      startIndex,
      endIndex
    );

    const totalPages = Math.ceil(total / limit);
    const queryTime = performance.now() - startTime;

    console.log(
      `Search: "${search || 'NONE'}" | Status: ${
        status || 'ALL'
      } | Priority: ${priority || 'ALL'} | Results: ${total}`
    );

    console.log(
      `Query completed in ${queryTime.toFixed(2)}ms`
    );

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      metadata: {
        queryTime,
        timestamp: new Date().toISOString(),
      },
    };
  }

  create(
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
  ): Task {
    const timestamp = new Date().toISOString();

    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.tasks.unshift(newTask);

    console.log(
      `Task created successfully: ${newTask.title}`
    );

    return newTask;
  }

  update(
    id: string,
    updates: Partial<Task>
  ): Task | null {
    const index = this.tasks.findIndex(
      (task) => task.id === id
    );

    if (index === -1) {
      return null;
    }

    this.tasks[index] = {
      ...this.tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    console.log(
      `Task updated successfully: ${this.tasks[index].title}`
    );

    return this.tasks[index];
  }

  delete(id: string): boolean {
    const index = this.tasks.findIndex(
      (task) => task.id === id
    );

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);

    console.log(`Task deleted successfully: ${id}`);

    return true;
  }

  getById(id: string): Task | null {
    return (
      this.tasks.find((task) => task.id === id) || null
    );
  }

  getAssignees(): string[] {
    const assignees = new Set<string>();

    this.tasks.forEach((task) => {
      if (task.assignee) {
        assignees.add(task.assignee);
      }
    });

    return Array.from(assignees);
  }
}

export const db = new MockDatabase();
