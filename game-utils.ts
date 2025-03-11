import { GameState, Square } from "@shared/schema";

export const INACTIVE_COLOR = "bg-gray-800";

export const SQUARE_COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500"
];

export function createInitialGameState(): GameState {
  return {
    squares: createSquares(),
    pattern: [],
    playerSequence: [],
    level: 0,
    score: 0,
    isDisplaying: false,
    isPlayerTurn: false,
    gameOver: false,
    gameStarted: false,
    showingCorrect: false,
    showingIncorrect: false
  };
}

export function createSquares(): Square[] {
  return Array.from({ length: 9 }, (_, index) => ({
    id: index,
    color: INACTIVE_COLOR, // All squares start with the inactive color
    isActive: false
  }));
}

export function generateNextPattern(currentPattern: number[]): number[] {
  const newStep = Math.floor(Math.random() * 9);
  return [...currentPattern, newStep];
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function calculateScore(level: number, sequenceLength: number): number {
  // Base score for completing the level
  const levelScore = level * 10;
  
  // Additional points for each step in the sequence
  const sequenceScore = sequenceLength * 5;
  
  return levelScore + sequenceScore;
}