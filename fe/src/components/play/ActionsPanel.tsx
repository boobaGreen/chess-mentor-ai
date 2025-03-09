import React from "react";
import { Button } from "../ui/button";
import { Trash as TrashIcon, RotateCcw, Play, PuzzleIcon } from "lucide-react";

interface ActionsPanelProps {
  clearBoard: () => void;
  resetToInitial: () => void;
  startGameFromPosition: () => void;
  startPuzzleFromPosition: () => void;
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({
  clearBoard,
  resetToInitial,
  startGameFromPosition,
  startPuzzleFromPosition,
}) => {
  return (
    <div className="p-4 border border-gray-300 rounded bg-gray-100 flex flex-col w-full mt-4">
      <h2 className="text-xl font-bold mb-2 text-center">Board Actions</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          onClick={clearBoard}
          className="flex items-center justify-center gap-1 border-1 w-32"
        >
          <TrashIcon className="h-4 w-4" /> Clear Board
        </Button>
        <Button
          onClick={resetToInitial}
          className="flex items-center justify-center gap-1 border-1 w-32"
        >
          <RotateCcw className="h-4 w-4" /> Start Position
        </Button>
        <Button
          onClick={startGameFromPosition}
          className="flex items-center justify-center gap-1 w-32"
          variant="outline"
        >
          <Play className="h-4 w-4" /> Start Game
        </Button>
        <Button
          onClick={startPuzzleFromPosition}
          className="flex items-center justify-center gap-1 w-32"
          variant="outline"
        >
          <PuzzleIcon className="h-4 w-4" /> Start Puzzle
        </Button>
      </div>
    </div>
  );
};

export default ActionsPanel;
