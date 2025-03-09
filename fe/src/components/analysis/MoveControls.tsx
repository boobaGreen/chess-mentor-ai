import React from "react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

interface MoveControlsProps {
  currentMoveIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any[];
  formatMoveNumber: (index: number) => string;
  goToStart: () => void;
  goToPreviousMove: () => void;
  goToNextMove: () => void;
  goToEnd: () => void;
}

const MoveControls: React.FC<MoveControlsProps> = ({
  currentMoveIndex,
  history,
  formatMoveNumber,
  goToStart,
  goToPreviousMove,
  goToNextMove,
  goToEnd,
}) => {
  return (
    <div className="flex items-center justify-center mt-2 mb-8 space-x-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={goToStart}
              disabled={currentMoveIndex < 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Prima mossa</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousMove}
              disabled={currentMoveIndex < 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mossa precedente</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button variant="default" className="px-6">
        {currentMoveIndex === -1
          ? "Inizio partita"
          : `${formatMoveNumber(currentMoveIndex)} ${
              history[currentMoveIndex]?.san || ""
            }`}
      </Button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextMove}
              disabled={currentMoveIndex >= history.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mossa successiva</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={goToEnd}
              disabled={currentMoveIndex >= history.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ultima mossa</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MoveControls;
