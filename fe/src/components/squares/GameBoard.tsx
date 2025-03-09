import { Chessboard } from "react-chessboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Target } from "lucide-react";
import { GameControls } from "./GameControls";

interface GameBoardProps {
  mode: "type" | "click";
  isPlaying: boolean;
  showCoordinates: boolean;
  targetSquare: string;
  timer: number;
  correctAnswers: number;
  attemptsLeft: number; // Add this line
  userInput?: string;
  setUserInput?: (value: string) => void;
  onStart: () => void;
  onSubmit?: () => void;
  onSquareClick?: (square: string) => void;
  onAbandon: () => void;
}
export const GameBoard: React.FC<GameBoardProps> = ({
  mode,
  isPlaying,
  showCoordinates,
  targetSquare,
  timer,
  correctAnswers,
  attemptsLeft,
  userInput,
  setUserInput,
  onStart,
  onSubmit,
  onSquareClick,
  onAbandon,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Target className="h-6 w-6" />
        {mode === "type"
          ? "Type the Highlighted Square"
          : `Find Square: ${isPlaying ? targetSquare : "Click Start"}`}
      </CardTitle>
      <CardDescription className="space-y-1">
        <p>
          {mode === "type"
            ? "Type the coordinate of the highlighted square"
            : "Click the correct square on the board"}
        </p>
        {isPlaying && (
          <p className="text-sm font-medium">
            Attempts remaining: {attemptsLeft}
          </p>
        )}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="aspect-square max-w-[400px] mx-auto">
        <Chessboard
          position="empty"
          showBoardNotation={showCoordinates}
          customSquareStyles={{
            [targetSquare]: {
              backgroundColor:
                isPlaying && mode === "type"
                  ? "rgba(255, 255, 0, 0.5)"
                  : undefined,
            },
          }}
          onSquareClick={onSquareClick}
        />
      </div>
      <GameControls
        isPlaying={isPlaying}
        timer={timer}
        correctAnswers={correctAnswers}
        userInput={userInput}
        setUserInput={setUserInput}
        onStart={onStart}
        onSubmit={onSubmit}
        showInput={mode === "type"}
        onAbandon={onAbandon}
      />
    </CardContent>
  </Card>
);
