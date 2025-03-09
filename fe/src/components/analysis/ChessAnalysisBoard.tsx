import React from "react";
import ChessboardWithEvaluation from "./ChessboardWithEvalutation";
import MoveControls from "./MoveControls";
import MoveHistory from "./MoveHistory";

interface MoveControlsType {
  goToPreviousMove: () => void;
  goToNextMove: () => void;
  goToStart: () => void;
  goToEnd: () => void;
}

interface ChessAnalysisBoardProps {
  fen: string;
  boardWidth: number;
  evaluation: number | string;
  showEvalBar: boolean;
  calculateAdvantagePercentage: (evaluation: number | string) => number;
  formatEvaluation: (evaluation: number | string) => string;
  currentMoveIndex: number;
  history: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  formatMoveNumber: (index: number) => string;
  moveControls: MoveControlsType;
  goToMove: (moveIndex: number) => void;
  gameInfo: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  toggleEvalBar: () => void;
}

const ChessAnalysisBoard: React.FC<ChessAnalysisBoardProps> = ({
  fen,
  boardWidth,
  evaluation,
  showEvalBar,
  calculateAdvantagePercentage,
  formatEvaluation,
  currentMoveIndex,
  history,
  formatMoveNumber,
  moveControls,
  goToMove,
  gameInfo,
  toggleEvalBar,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <ChessboardWithEvaluation
          fen={fen}
          evaluation={evaluation}
          showEvalBar={showEvalBar}
          calculateAdvantagePercentage={calculateAdvantagePercentage}
          formatEvaluation={formatEvaluation}
          boardWidth={boardWidth}
        />
      </div>

      {/* Controls and history */}
      <div className="w-full mt-3">
        <MoveControls
          currentMoveIndex={currentMoveIndex}
          history={history}
          formatMoveNumber={formatMoveNumber}
          goToStart={moveControls.goToStart}
          goToPreviousMove={moveControls.goToPreviousMove}
          goToNextMove={moveControls.goToNextMove}
          goToEnd={moveControls.goToEnd}
        />
        <div className="mt-3">
          <MoveHistory
            history={history}
            currentMoveIndex={currentMoveIndex}
            goToMove={goToMove}
            gameInfo={gameInfo}
            toggleEvalBar={toggleEvalBar}
            showEvalBar={showEvalBar}
          />
        </div>
      </div>
    </div>
  );
};

export default ChessAnalysisBoard;
