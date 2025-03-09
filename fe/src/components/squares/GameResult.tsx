import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface GameResultProps {
  time: number;
  correct: number;
  total: number;
  showCoordinates: boolean;
}

export const GameResult: React.FC<GameResultProps> = ({
  time,
  correct,
  total,
  showCoordinates,
}) => (
  <Alert>
    <AlertTitle>Game Results</AlertTitle>
    <AlertDescription>
      Time: {time}s | Score: {correct}/{total}
      {correct === total && !showCoordinates && (
        <p className="text-green-600 mt-2">
          Perfect score! Your time has been added to the leaderboard.
        </p>
      )}
    </AlertDescription>
  </Alert>
);
