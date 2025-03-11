import { motion } from "framer-motion";
import { HashIcon, LayersIcon } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  level: number;
  isGameStarted: boolean;
}

export default function ScoreDisplay({ score, level, isGameStarted }: ScoreDisplayProps) {
  return (
    <motion.div 
      className="flex space-x-4 mb-4 md:mb-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <HashIcon className="h-5 w-5 text-primary mr-2" />
        <div>
          <p className="text-xs text-gray-400 uppercase font-semibold">Score</p>
          <p className="text-2xl font-bold text-white">{isGameStarted ? score : 0}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <LayersIcon className="h-5 w-5 text-primary mr-2" />
        <div>
          <p className="text-xs text-gray-400 uppercase font-semibold">Level</p>
          <p className="text-2xl font-bold text-white">{isGameStarted ? level : 0}</p>
        </div>
      </div>
    </motion.div>
  );
}