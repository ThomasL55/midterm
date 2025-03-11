import { useState, useEffect, useCallback } from "react";
import { GameState } from "@shared/schema";
import {
  createInitialGameState,
  generateNextPattern,
  delay,
  calculateScore,
  SQUARE_COLORS
} from "@/lib/game-utils";

interface FeedbackInfo {
  message: string;
  isVisible: boolean;
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [showHelp, setShowHelp] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackInfo>({
    message: "",
    isVisible: false
  });

  // Reset the game to initial state
  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  // Start a new game
  const startGame = useCallback(async () => {
    const initialGameState = createInitialGameState();
    const firstPattern = generateNextPattern([]);
    
    setGameState({
      ...initialGameState,
      pattern: firstPattern,
      isDisplaying: true,
      gameStarted: true,
      level: 1
    });
  }, []);
  
  // Display a current pattern
  const displayPattern = useCallback(async (patternToShow: number[]) => {
    if (!patternToShow.length) return;
    
    // Set displaying mode
    setGameState(prev => ({
      ...prev,
      isDisplaying: true,
      isPlayerTurn: false
    }));
    
    // Reset all squares first
    setGameState(prev => ({
      ...prev,
      squares: prev.squares.map(square => ({ ...square, isActive: false }))
    }));
    
    // Wait a moment before starting
    await delay(1000);
    
    // Display each square in the pattern with a delay
    for (let i = 0; i < patternToShow.length; i++) {
      const squareId = patternToShow[i];
      
      // Highlight the current square
      setGameState(prev => ({
        ...prev,
        squares: prev.squares.map(square => 
          square.id === squareId 
            ? { ...square, isActive: true } 
            : { ...square, isActive: false }
        )
      }));
      
      // Wait for the highlight to be visible
      await delay(800);
      
      // Turn off the highlight
      setGameState(prev => ({
        ...prev,
        squares: prev.squares.map(square => ({ ...square, isActive: false }))
      }));
      
      // Short delay between highlights
      await delay(400);
    }
    
    // Set player's turn
    setGameState(prev => ({
      ...prev,
      isDisplaying: false,
      isPlayerTurn: true,
      playerSequence: []
    }));
  }, []);

  // Handle player's click on a square
  const handleSquareClick = useCallback((squareId: number) => {
    if (!gameState.isPlayerTurn || gameState.isDisplaying) return;
    
    // Update the active square
    setGameState(prev => ({
      ...prev,
      squares: prev.squares.map(square => 
        square.id === squareId 
          ? { ...square, isActive: true } 
          : square
      ),
      playerSequence: [...prev.playerSequence, squareId]
    }));
    
    // Reset the square after a brief moment
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        squares: prev.squares.map(square => 
          square.id === squareId 
            ? { ...square, isActive: false } 
            : square
        )
      }));
    }, 300);
    
    // Check if the player's move was correct
    const currentIndex = gameState.playerSequence.length;
    if (squareId !== gameState.pattern[currentIndex]) {
      // Wrong square clicked
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        isPlayerTurn: false,
        showingIncorrect: true
      }));
      
      // Display feedback
      setFeedback({
        message: "Wrong! Game Over!",
        isVisible: true
      });
      
      setTimeout(() => {
        setFeedback({ message: "", isVisible: false });
      }, 2000);
      
      return;
    }
    
    // Check if the player has completed the current pattern
    if (gameState.playerSequence.length === gameState.pattern.length - 1) {
      // Completed pattern correctly
      const newLevel = gameState.level + 1;
      const newPattern = generateNextPattern(gameState.pattern);
      const newScore = calculateScore(gameState.level, gameState.pattern.length);
      
      // Show success feedback
      setGameState(prev => ({
        ...prev,
        showingCorrect: true,
        isPlayerTurn: false
      }));
      
      setFeedback({
        message: "Correct! Next level!",
        isVisible: true
      });
      
      setTimeout(() => {
        setFeedback({ message: "", isVisible: false });
        
        // Move to the next level
        setGameState(prev => ({
          ...prev,
          level: newLevel,
          score: prev.score + newScore,
          pattern: newPattern,
          playerSequence: [],
          showingCorrect: false
        }));
      }, 1500);
    }
  }, [gameState]);

  // Effects
  
  // Effect to display pattern when it changes or game starts
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver && !gameState.isPlayerTurn && !gameState.showingCorrect && !gameState.showingIncorrect) {
      displayPattern(gameState.pattern);
    }
  }, [displayPattern, gameState.gameStarted, gameState.gameOver, gameState.isPlayerTurn, gameState.pattern, gameState.showingCorrect, gameState.showingIncorrect]);

  return {
    // State
    gameState,
    showHelp,
    feedback,
    
    // Actions
    resetGame,
    startGame,
    handleSquareClick,
    setShowHelp
  };
}