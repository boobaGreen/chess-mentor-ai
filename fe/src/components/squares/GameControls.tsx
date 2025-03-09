import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Timer, XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface GameControlsProps {
  isPlaying: boolean;
  timer: number;
  correctAnswers: number;
  userInput?: string;
  setUserInput?: (value: string) => void;
  onStart: () => void;
  onSubmit?: () => void;
  onAbandon: () => void;
  showInput: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  timer,
  correctAnswers,
  userInput,
  setUserInput,
  onStart,
  onSubmit,
  onAbandon,
  showInput,
}) => (
  <div className="mt-4 space-y-4">
    <div className="flex items-center gap-4">
      <Timer className="h-5 w-5 text-primary" />
      <span className="text-2xl font-mono text-primary">{timer}s</span>
      <Progress
        value={(correctAnswers / 30) * 100}
        className="h-2 bg-gray-200"
      />
      <span className="font-semibold text-primary">{correctAnswers}/30</span>
    </div>
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2 flex-1">
        {showInput && (
          <Input
            value={userInput}
            onChange={(e) => setUserInput?.(e.target.value)}
            placeholder="Enter square (e.g., e4)"
            disabled={!isPlaying}
            onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
            className="flex-1 border-2 focus:ring-2 focus:ring-primary/20"
          />
        )}
        {!isPlaying ? (
          <Button
            onClick={onStart}
            className="w-24 bg-primary hover:bg-primary/90 text-black font-semibold bg-amber-100"
          >
            Start
          </Button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="gap-2 bg-red-600 hover:bg-red-700 text-white border border-red-700 shadow-sm"
              >
                <XCircle className="h-4 w-4" />
                Abandon
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-2 border-gray-200 shadow-lg">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600 text-base">
                  This will end your current game. Your progress will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-2">
                <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-2 border-gray-200">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onAbandon}
                  className="bg-red-600 hover:bg-red-700 text-white border border-red-700"
                >
                  Yes, abandon game
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  </div>
);
