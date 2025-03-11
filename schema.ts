import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const scores = pgTable("scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  score: integer("score").notNull(),
  moves: integer("moves").notNull(),
  completedAt: text("completed_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertScoreSchema = createInsertSchema(scores).pick({
  userId: true,
  score: true,
  moves: true,
  completedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertScore = z.infer<typeof insertScoreSchema>;
export type Score = typeof scores.$inferSelect;

// Game types
export interface Square {
  id: number;
  color: string;
  isActive: boolean;
}

export interface GameState {
  squares: Square[];
  pattern: number[];
  playerSequence: number[];
  level: number;
  score: number;
  isDisplaying: boolean;
  isPlayerTurn: boolean;
  gameOver: boolean;
  gameStarted: boolean;
  showingCorrect: boolean;
  showingIncorrect: boolean;
}
