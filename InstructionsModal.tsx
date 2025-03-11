import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

interface InstructionsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function InstructionsModal({ isVisible, onClose }: InstructionsModalProps) {
  return (
    <Dialog open={isVisible}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How to Play</DialogTitle>
          <DialogDescription>
            Test your memory with this pattern matching game!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-primary">Game Rules</h3>
            <ol className="list-decimal ml-5 text-sm text-gray-300 space-y-1">
              <li>Watch as squares light up in a specific sequence</li>
              <li>After the sequence is shown, click on the squares in the same order</li>
              <li>Each correct sequence advances you to the next level</li>
              <li>Each level adds one more step to the pattern</li>
              <li>Make a mistake and the game is over!</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary">Scoring</h3>
            <p className="text-sm text-gray-300">
              You'll earn 10 points for each level plus 5 points for each step in the sequence!
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary">Tips</h3>
            <ul className="list-disc ml-5 text-sm text-gray-300 space-y-1">
              <li>Try to memorize the pattern both by color and position</li>
              <li>Start saying the pattern out loud to help remember it</li>
              <li>Focus on the game to avoid distractions</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} variant="default">
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}