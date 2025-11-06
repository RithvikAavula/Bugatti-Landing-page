import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConfigurationSchema, insertTestDriveRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/configurations", async (req, res) => {
    try {
      const validatedData = insertConfigurationSchema.parse(req.body);
      const configuration = await storage.createConfiguration(validatedData);
      res.json(configuration);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/configurations/:id", async (req, res) => {
    try {
      const configuration = await storage.getConfiguration(req.params.id);
      if (!configuration) {
        return res.status(404).json({ error: "Configuration not found" });
      }
      res.json(configuration);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/configurations", async (req, res) => {
    try {
      const configurations = await storage.getAllConfigurations();
      res.json(configurations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/test-drive-requests", async (req, res) => {
    try {
      const validatedData = insertTestDriveRequestSchema.parse(req.body);
      const request = await storage.createTestDriveRequest(validatedData);
      res.json(request);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/test-drive-requests", async (req, res) => {
    try {
      const requests = await storage.getAllTestDriveRequests();
      res.json(requests);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
