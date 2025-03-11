import { motion, AnimatePresence } from "framer-motion";
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";

interface FeedbackMessageProps {
  message: string;
  isVisible: boolean;
}

export default function FeedbackMessage({ message, isVisible }: FeedbackMessageProps) {
  const isError = message.toLowerCase().includes("wrong") || message.toLowerCase().includes("game over");
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`rounded-md p-3 flex items-center justify-center ${
            isError ? "bg-red-900/60 text-red-200" : "bg-green-900/60 text-green-200"
          }`}
        >
          {isError ? (
            <AlertCircleIcon className="h-5 w-5 mr-2 text-red-300" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-300" />
          )}
          <span className="font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}