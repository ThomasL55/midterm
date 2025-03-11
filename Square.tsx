import { motion } from "framer-motion";
import { Square as SquareType } from "@shared/schema";
import { INACTIVE_COLOR, SQUARE_COLORS } from "@/lib/game-utils";

interface SquareProps {
  square: SquareType;
  onClick: () => void;
  disabled: boolean;
}

export default function Square({ square, onClick, disabled }: SquareProps) {
  // When a square is active, it lights up with its color from the SQUARE_COLORS array
  // When inactive, it remains white
  const displayColor = square.isActive ? SQUARE_COLORS[square.id] : INACTIVE_COLOR;
  
  return (
    <motion.button
      className={`aspect-square rounded-lg shadow-md transition-all duration-200 border border-gray-700 ${
        displayColor
      } ${square.isActive ? 'shadow-lg scale-105 border-gray-600' : 'opacity-90 hover:opacity-100'}`}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Square ${square.id}`}
    />
  );
}