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

  // =========================================================
  // URL SHARE / DATA PERSISTENCE FIX
  // Same browser- tab- task data
  // localStorage
  // =========================================================
  private storageKey = 'team-task-system-tasks';

  constructor() {
    const savedTasks = localStorage.getItem(this.storageKey);

    if (savedTasks) {
      // Existing data
      this.tasks = JSON.parse(savedTasks);
    } else {
      //500 mock task generate 
      this.tasks = this.generateMockTasks(this.seedCount);

      // Browser storage- save 
      this.saveTasks();
    }
  }

  // =========================================================
  // SAVE TASKS
  // Create / Update / Delete- data persist
  // =========================================================
  private saveTasks(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.tasks)
    );
  }

  // =========================================================
  // Generate Mock Tasks
  // =========================================================
  private generateMockTasks(count: number): Task[] {
    const statuses: TaskStatus[] = [
      'todo',
      'in-progress',
      'review',
      'done',
    ];

    const priorities: Priority[] = [
      'low',
      'medium',
      'high',
      'urgent',
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: `task-${i + 1}`,

      title: this.generateRealisticTitle(),

      description:
        Math.random() > 0.3
          ? faker.lorem.paragraph()
          : undefined,

      assignee:
        Math.random() > 0.2
          ? this.generateRealisticName()
          : undefined,

      status:
        statuses[
          Math.floor(Math.random() * statuses.length)
        ],

      priority:
        priorities[
          Math.floor(Math.random() * priorities.length)
        ],

      dueDate:
        Math.random() > 0.2
          ? this.generateRealisticDueDate()
          : undefined,

      createdAt: this.generateRealisticCreatedDate(),

      updatedAt: new Date().toISOString(),
    }));
  }

  // =========================================================
  // Generate Realistic Task Title
  // =========================================================
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
      templates[
        Math.floor(Math.random() * templates.length)
      ];

    return template.replace(
      /%s/g,
      () =>
        words[
          Math.floor(Math.random() * words.length)
        ]
    );
  }

  // =========================================================
  // Generate Realistic Assignee Name
  // =========================================================
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

    return names[
      Math.floor(Math.random() * names.length)
    ];
  }

  // =========================================================
  // Generate Due Date
  // =========================================================
  private generateRealisticDueDate(): string {
    const date = new Date();

    date.setDate(
      date.getDate() +
        Math.floor(Math.random() * 30) -
        5
    );

    return date.toISOString().split('T')[0];
  }

  // =========================================================
  // Generate Created Date
  // =========================================================
  private generateRealisticCreatedDate(): string {
    const date = new Date();

    date.setDate(
      date.getDate() -
        Math.floor(Math.random() * 60)
    );

    return date.toISOString();
  }

  // =========================================================
  // QUERY
  // Search + Filter + Sort + Pagination
  // =========================================================
  query(
    filters: TaskFilters = {}
  ): PaginatedResponse<Task> {
    const startTime = performance.now();

    const {
      page = 1,
      limit = 20,
      status,
      priority,
      assignee,
      overdue,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    let result = [...this.tasks];

    // =======================================================
    // Status Filter
    // =======================================================
    if (status) {
      result = result.filter(
        (task) => task.status === status
      );
    }

    // =======================================================
    // Priority Filter
    // =======================================================
    if (priority) {
      result = result.filter(
        (task) => task.priority === priority
      );
    }

    // =======================================================
    // Assignee Filter
    // =======================================================
    if (assignee) {
      result = result.filter((task) =>
        task.assignee
          ?.toLowerCase()
          .includes(assignee.toLowerCase())
      );
    }

 // =======================================================
    // Overdue Filter
// =======================================================
    if (overdue) {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      result = result.filter((task) => {
        if (!task.dueDate) {
          return false;
        }

        const dueDate = new Date(task.dueDate);

        dueDate.setHours(0, 0, 0, 0);

        return (
          dueDate < today &&
          task.status !== 'done'
        );
      });
    }


    // =======================================================
    // Search
    // Title + Description + Assignee
    // =======================================================
    if (search && search.trim()) {
      const searchLower =
        search.toLowerCase().trim();

      result = result.filter((task) => {
        const titleMatch =
          task.title
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

        return (
          titleMatch ||
          descriptionMatch ||
          assigneeMatch
        );
      });
    }

    // =======================================================
    // Sorting
    // =======================================================
    result.sort((a: any, b: any) => {
      const valueA = a[sortBy] || '';
      const valueB = b[sortBy] || '';

      if (sortOrder === 'asc') {
        if (valueA === valueB) return 0;
        return valueA > valueB ? 1 : -1;
      }

      if (valueA === valueB) return 0;
      return valueA < valueB ? 1 : -1;
    });

    // =======================================================
    // Pagination
    // =======================================================
    const total = result.length;

    const startIndex =
      (page - 1) * limit;

    const endIndex =
      startIndex + limit;

    const paginatedData =
      result.slice(
        startIndex,
        endIndex
      );

    const totalPages =
      Math.ceil(total / limit);

    const queryTime =
      performance.now() - startTime;

    // =======================================================
    // Debug Logs
    // =======================================================
    console.log(
      `Search: "${search || 'NONE'}" | Status: ${
        status || 'ALL'
      } | Priority: ${
        priority || 'ALL'
      } | Results: ${total}`
    );

    console.log(
      `Query completed in ${queryTime.toFixed(2)}ms`
    );

    // =======================================================
    // Response
    // =======================================================
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
        timestamp:
          new Date().toISOString(),
      },
    };
  }

  // =========================================================
  // CREATE TASK
  // =========================================================
  create(
    task: Omit<
      Task,
      'id' | 'createdAt' | 'updatedAt'
    >
  ): Task {
    const timestamp =
      new Date().toISOString();

    const newTask: Task = {
      ...task,

      id: `task-${Date.now()}`,

      createdAt: timestamp,

      updatedAt: timestamp,
    };

    this.tasks.unshift(newTask);

    // Persist new task
    this.saveTasks();

    console.log(
      `Task created successfully: ${newTask.title}`
    );

    return newTask;
  }

  // =========================================================
  // UPDATE TASK
  // =========================================================
  update(
    id: string,
    updates: Partial<Task>
  ): Task | null {
    const index =
      this.tasks.findIndex(
        (task) => task.id === id
      );

    if (index === -1) {
      return null;
    }

    this.tasks[index] = {
      ...this.tasks[index],

      ...updates,

      updatedAt:
        new Date().toISOString(),
    };

    // Persist updated task
    this.saveTasks();

    console.log(
      `Task updated successfully: ${
        this.tasks[index].title
      }`
    );

    return this.tasks[index];
  }

  // =========================================================
  // DELETE TASK
  // =========================================================
  delete(id: string): boolean {
    const index =
      this.tasks.findIndex(
        (task) => task.id === id
      );

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);

    // Persist deleted task state
    this.saveTasks();

    console.log(
      `Task deleted successfully: ${id}`
    );

    return true;
  }

  // =========================================================
  // GET TASK BY ID
  // =========================================================
  getById(
    id: string
  ): Task | null {
    return (
      this.tasks.find(
        (task) => task.id === id
      ) || null
    );
  }

  // =========================================================
  // GET ALL ASSIGNEES
  // =========================================================
  getAssignees(): string[] {
    const assignees =
      new Set<string>();

    this.tasks.forEach((task) => {
      if (task.assignee) {
        assignees.add(
          task.assignee
        );
      }
    });

    return Array.from(assignees);
  }
}

// ===========================================================
// SINGLE MOCK DATABASE INSTANCE
// ===========================================================
export const db =
  new MockDatabase();
