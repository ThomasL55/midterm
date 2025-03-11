import { Button } from "../../components/ui/button";
import { 
  PlayIcon, 
  RefreshCwIcon, 
  HelpCircleIcon,
  PauseIcon
} from "lucide-react";
import { motion } from "framer-motion";

interface GameControlsProps {
  onReset: () => void;
  onStart: () => void;
  onHelp: () => void;
  isGameStarted: boolean;
  isGameOver: boolean;
}

export default function GameControls({ 
  onReset, 
  onStart,
  onHelp,
  isGameStarted,
  isGameOver
}: GameControlsProps) {
  return (
    <motion.div 
      className="flex space-x-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {!isGameStarted && !isGameOver ? (
        <Button 
          onClick={onStart}
          className="flex items-center"
          variant="default"
        >
          <PlayIcon className="mr-1 h-4 w-4" />
          Start
        </Button>
      ) : (
        <Button 
          onClick={onReset}
          className="flex items-center"
          variant="destructive"
        >
          <RefreshCwIcon className="mr-1 h-4 w-4" />
          Reset
        </Button>
      )}
      
      <Button 
        onClick={onHelp}
        variant="outline"
        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        <HelpCircleIcon className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only sm:ml-1">Help</span>
      </Button>
    </motion.div>
  );
}