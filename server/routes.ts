import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAllUsers, getUserById } from './models/userModel.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getLatestMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  // Users DB조회
  //app.get(`${API_BASE}/api/users`, async (req, res) => {
  app.get("/api/users", async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (err: unknown) {
      const error = err as Error; // 또는 `as any` 로도 가능
      console.error('🔴 DB 조회 중 에러 발생:', error.message);
      res.status(500).json({
        error: 'DB 조회 실패',
        message: error.message,
      });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await getUserById(parseInt(req.params.id));
      if (user) res.json(user);
      else res.status(404).json({ error: 'User not found' });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // ID로 조회
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  // Activities
  app.get("/api/activities", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activities = await storage.getRecentActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  // Chart data endpoint
  app.get("/api/chart-data", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      
      // Generate sample chart data for the last 7 days
      const chartData = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        chartData.push({
          date: date.toISOString().split('T')[0],
          projects: Math.floor(Math.random() * 10) + 15,
          deployments: Math.floor(Math.random() * 8) + 5,
          users: Math.floor(Math.random() * 20) + 40,
        });
      }
      
      res.json(chartData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chart data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
