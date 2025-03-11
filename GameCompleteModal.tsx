import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { TrophyIcon, ActivityIcon } from "lucide-react";

interface GameCompleteModalProps {
  isVisible: boolean;
  score: number;
  level: number;
  onPlayAgain: () => void;
}

export default function GameCompleteModal({ 
  isVisible, 
  score, 
  level,
  onPlayAgain 
}: GameCompleteModalProps) {
  return (
    <Dialog open={isVisible}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Game Over!</DialogTitle>
          <DialogDescription className="text-center">
            Your memory skills are impressive!
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 my-6">
          <motion.div 
            className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TrophyIcon className="h-10 w-10 text-yellow-500 mb-2" />
            <p className="text-sm text-gray-400 uppercase font-semibold">Final Score</p>
            <p className="text-3xl font-bold text-primary">{score}</p>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ActivityIcon className="h-10 w-10 text-green-500 mb-2" />
            <p className="text-sm text-gray-400 uppercase font-semibold">Highest Level</p>
            <p className="text-3xl font-bold text-primary">{level}</p>
          </motion.div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-center">
          <Button onClick={onPlayAgain} variant="default" className="w-full sm:w-auto">
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}