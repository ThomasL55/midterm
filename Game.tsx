import { useGame } from "../hooks/useGame";
import GameBoard from "../components/game/GameBoard";
import ScoreDisplay from "../components/game/ScoreDisplay";
import GameControls from "../components/game/GameControls";
import FeedbackMessage from "../components/game/FeedbackMessage";
import GameCompleteModal from "../components/game/GameCompleteModal";
import InstructionsModal from "../components/game/InstructionsModal";

export default function Game() {
  const { 
    gameState, 
    showHelp, 
    feedback,
    resetGame,
    startGame,
    handleSquareClick,
    setShowHelp
  } = useGame();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary">
          Pattern Master
        </h1>
        
        <p className="text-center text-gray-400 mb-8">
          Test your memory by repeating patterns of increasing complexity
        </p>
      
        <div className="mb-6">
          <FeedbackMessage 
            message={feedback.message} 
            isVisible={feedback.isVisible} 
          />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <ScoreDisplay 
            score={gameState.score} 
            level={gameState.level}
            isGameStarted={gameState.gameStarted}
          />
          
          <GameControls 
            onReset={resetGame}
            onStart={startGame}
            onHelp={() => setShowHelp(true)}
            isGameStarted={gameState.gameStarted}
            isGameOver={gameState.gameOver}
          />
        </div>
        
        <GameBoard 
          squares={gameState.squares}
          onSquareClick={handleSquareClick}
          isPlayerTurn={gameState.isPlayerTurn}
          isDisplaying={gameState.isDisplaying}
        />
        
        <GameCompleteModal 
          isVisible={gameState.gameOver} 
          score={gameState.score}
          level={gameState.level}
          onPlayAgain={resetGame}
        />
        
        <InstructionsModal 
          isVisible={showHelp}
          onClose={() => setShowHelp(false)}
        />
      </div>
    </div>
  );
}