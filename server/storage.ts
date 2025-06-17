import { users, projects, activities, metrics, type User, type InsertUser, type Project, type InsertProject, type Activity, type InsertActivity, type Metrics, type InsertMetrics } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Projects
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined>;
  
  // Activities
  getRecentActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Metrics
  getLatestMetrics(): Promise<Metrics | undefined>;
  createMetrics(metrics: InsertMetrics): Promise<Metrics>;
  getMetricsHistory(days: number): Promise<Metrics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private activities: Map<number, Activity>;
  private metrics: Map<number, Metrics>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentActivityId: number;
  private currentMetricsId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.activities = new Map();
    this.metrics = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentActivityId = 1;
    this.currentMetricsId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed users
    const user1: User = {
      id: this.currentUserId++,
      username: "johndoe",
      email: "john@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      avatar: null,
      role: "admin",
      createdAt: new Date(),
    };
    this.users.set(user1.id, user1);

    const user2: User = {
      id: this.currentUserId++,
      username: "sarahjones",
      email: "sarah@example.com",
      password: "password123",
      firstName: "Sarah",
      lastName: "Jones",
      avatar: null,
      role: "member",
      createdAt: new Date(),
    };
    this.users.set(user2.id, user2);

    // Seed projects
    const project1: Project = {
      id: this.currentProjectId++,
      name: "E-commerce Platform",
      description: "Modern e-commerce solution with React and Node.js",
      status: "active",
      technologies: ["React", "Node.js", "PostgreSQL"],
      ownerId: user1.id,
      memberCount: 3,
      lastUpdated: new Date(),
      createdAt: new Date(),
    };
    this.projects.set(project1.id, project1);

    const project2: Project = {
      id: this.currentProjectId++,
      name: "Mobile Dashboard",
      description: "React Native dashboard with Firebase backend",
      status: "in_progress",
      technologies: ["React Native", "Firebase"],
      ownerId: user2.id,
      memberCount: 2,
      lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    };
    this.projects.set(project2.id, project2);

    // Seed activities
    const activities = [
      {
        id: this.currentActivityId++,
        type: "project_created",
        description: "New project \"Web App\" created",
        userId: user1.id,
        projectId: project1.id,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: this.currentActivityId++,
        type: "deployment",
        description: "Deployment successful",
        userId: user1.id,
        projectId: project1.id,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: this.currentActivityId++,
        type: "team_invite",
        description: "Team member invited",
        userId: user1.id,
        projectId: null,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
      {
        id: this.currentActivityId++,
        type: "backup",
        description: "Database backup completed",
        userId: null,
        projectId: null,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
    ];

    activities.forEach(activity => {
      this.activities.set(activity.id, activity as Activity);
    });

    // Seed metrics
    const currentMetrics: Metrics = {
      id: this.currentMetricsId++,
      date: new Date(),
      activeProjects: 24,
      totalMembers: 156,
      successRate: 89,
      avgResponseTime: 2400, // in milliseconds
    };
    this.metrics.set(currentMetrics.id, currentMetrics);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      lastUpdated: new Date(),
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updates, lastUpdated: new Date() };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async getRecentActivities(limit: number = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = {
      ...insertActivity,
      id,
      createdAt: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getLatestMetrics(): Promise<Metrics | undefined> {
    const allMetrics = Array.from(this.metrics.values());
    return allMetrics.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
  }

  async createMetrics(insertMetrics: InsertMetrics): Promise<Metrics> {
    const id = this.currentMetricsId++;
    const metrics: Metrics = {
      ...insertMetrics,
      id,
      date: new Date(),
    };
    this.metrics.set(id, metrics);
    return metrics;
  }

  async getMetricsHistory(days: number): Promise<Metrics[]> {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return Array.from(this.metrics.values())
      .filter(metrics => metrics.date >= cutoff)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}

export const storage = new MemStorage();
