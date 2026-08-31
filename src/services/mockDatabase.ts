import { Task, TaskStatus, Priority, TaskFilters, PaginatedResponse } from '@/types/task';
import { faker } from '@faker-js/faker';

export class MockDatabase {
  private tasks: Task[] = [];

  constructor() {
    this.tasks = this.generateMockTasks(500);
  }

  private generateMockTasks(count: number): Task[] {
    const statuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];
    const priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `task-${i + 1}`,
      title: this.generateRealisticTitle(),
      description: Math.random() > 0.3 ? faker.lorem.paragraph() : undefined,
      assignee: Math.random() > 0.2 ? this.generateRealisticName() : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      dueDate: Math.random() > 0.2 ? this.generateRealisticDueDate() : undefined,
      createdAt: this.generateRealisticCreatedDate(),
      updatedAt: new Date().toISOString()
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
      'Refactor %s component'
    ];
    
    const words = ['login', 'payment', 'profile', 'search', 'notifications', 'analytics', 'dashboard', 'API', 'database', 'UI'];
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.replace(/%s/g, () => words[Math.floor(Math.random() * words.length)]);
  }

  private generateRealisticName(): string {
    const names = [
      'Md. Rahim Khan', 'Sakib Al Hasan', 'Nadia Rahman', 
      'Kamal Hossain', 'Jannatul Ferdous', 'Farhan Ahmed',
      'Tasnim Begum', 'Christopher Jonathan Pennington', // লম্বা নাম
      'Rafiq Islam', 'Shakila Akter'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  private generateRealisticDueDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30) - 5);
    return date.toISOString().split('T')[0];
  }

  private generateRealisticCreatedDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60));
    return date.toISOString();
  }

  //Main query method - simulates database query
  query(filters: TaskFilters = {}): PaginatedResponse<Task> {
    const startTime = performance.now();
    
    let {
      page = 1,
      limit = 20,
      status,
      priority,
      assignee,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = filters;

    let result = [...this.tasks];

    //FILTER (WHERE clause)
    if (status) {
      result = result.filter(task => task.status === status);
    }
    if (priority) {
      result = result.filter(task => task.priority === priority);
    }
    if (assignee) {
      result = result.filter(task => 
        task.assignee?.toLowerCase().includes(assignee.toLowerCase())
      );
    }

    //SEARCH (FULL-TEXT search)
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower) ||
        task.assignee?.toLowerCase().includes(searchLower)
      );
    }

    //SORT (ORDER BY)
    result.sort((a: any, b: any) => {
      const valA = a[sortBy] || '';
      const valB = b[sortBy] || '';
      return sortOrder === 'asc' 
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });

    //PAGINATION (LIMIT/OFFSET)
    const total = result.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = result.slice(startIndex, endIndex);

    const queryTime = performance.now() - startTime;

    // Log query (like database log)
    console.log(`🔍 Query: ${filters.status || 'ALL'} | ${filters.search || 'NO SEARCH'} | Page ${page}`);
    console.log(`⏱️ Found ${total} results in ${queryTime.toFixed(2)}ms`);

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      metadata: {
        queryTime,
        timestamp: new Date().toISOString()
      }
    };
  }

  // CRUD Operations
  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, updates: Partial<Task>): Task | null {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.tasks[index];
  }

  delete(id: string): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  getById(id: string): Task | null {
    return this.tasks.find(t => t.id === id) || null;
  }

  // Get unique assignees for filter
  getAssignees(): string[] {
    const assignees = new Set<string>();
    this.tasks.forEach(task => {
      if (task.assignee) assignees.add(task.assignee);
    });
    return Array.from(assignees);
  }
}

export const db = new MockDatabase();