import { motion } from "framer-motion";
import { Square as SquareType } from "@shared/schema";
import Square from "./Square";

interface GameBoardProps {
  squares: SquareType[];
  onSquareClick: (squareId: number) => void;
  isPlayerTurn: boolean;
  isDisplaying: boolean;
}

export default function GameBoard({ 
  squares, 
  onSquareClick,
  isPlayerTurn,
  isDisplaying
}: GameBoardProps) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-md mx-auto aspect-square"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {squares.map((square) => (
        <Square
          key={square.id}
          square={square}
          onClick={() => onSquareClick(square.id)}
          disabled={!isPlayerTurn || isDisplaying}
        />
      ))}
    </motion.div>
  );
}