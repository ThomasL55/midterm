import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScoreSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // High scores endpoint
  app.get("/api/scores", async (req, res) => {
    try {
      const scores = await storage.getTopScores(10);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scores" });
    }
  });

  // Save score endpoint
  app.post("/api/scores", async (req, res) => {
    try {
      const scoreData = insertScoreSchema.parse(req.body);
      const score = await storage.saveScore(scoreData);
      res.status(201).json(score);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid score data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save score" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
