import { motion } from "framer-motion";
import { Card as CardType } from "@shared/schema";
import { LightbulbIcon } from "lucide-react";

interface CardProps {
  card: CardType;
  onClick: () => void;
}

export default function Card({ card, onClick }: CardProps) {
  return (
    <motion.div
      className="aspect-square cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
      whileTap={{ scale: card.isFlipped || card.isMatched ? 1 : 0.95 }}
      data-testid={`card-${card.id}`}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          card.isFlipped || card.isMatched ? "rotate-y-180" : ""
        }`}
        style={{ 
          transformStyle: "preserve-3d", 
          transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "" 
        }}
      >
        {/* Card Back */}
        <div 
          className="absolute w-full h-full bg-[#6366F1] rounded-xl flex items-center justify-center shadow-md backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <LightbulbIcon className="h-12 w-12 text-white" />
        </div>
        
        {/* Card Front */}
        <div 
          className="absolute w-full h-full bg-white rounded-xl flex items-center justify-center shadow-md backface-hidden"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)"
          }}
        >
          <span className={`text-3xl font-bold ${card.color}`}>
            {card.value}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
