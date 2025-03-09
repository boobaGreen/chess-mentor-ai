import React from "react";
import { Chessboard } from "react-chessboard";

interface ChessboardWithEvaluationProps {
  fen: string;
  evaluation: number | null;
  lastMove?: { from: string; to: string } | null;
  onSquareClick?: (square: string) => void;
  boardWidth?: number;
}

const ChessboardWithEvaluation: React.FC<ChessboardWithEvaluationProps> = ({
  fen,
  evaluation,
  lastMove = null,
  onSquareClick,
  boardWidth = 500,
}) => {
  const formatEvaluation = (eval_: number | null): string => {
    if (eval_ === null) return "0.0";

    if (eval_ === Infinity) return "Mate";
    if (eval_ === -Infinity) return "-Mate";

    return eval_.toFixed(1);
  };

  const getEvaluationBarHeight = (eval_: number | null): number => {
    if (eval_ === null) return 50; // metà altezza (neutro)

    // Limitiamo la valutazione tra -5 e +5 per la visualizzazione
    const clampedEval = Math.max(Math.min(eval_, 5), -5);
    // Convertiamo a percentuale (0-100)
    // -5 = 0%, 0 = 50%, +5 = 100%
    return 50 - clampedEval * 10;
  };

  return (
    <div className="relative">
      {/* Barra di valutazione a sinistra */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-200 rounded-l-md overflow-hidden flex flex-col">
        {/* Area bianca (sopra) */}
        <div
          className="bg-white border-b border-gray-300"
          style={{ height: `${getEvaluationBarHeight(evaluation)}%` }}
        />
        {/* Area nera (sotto) */}
        <div className="bg-gray-800 flex-grow" />

        {/* Etichetta della valutazione */}
        <div
          className="absolute left-0 right-0 py-1 flex justify-center text-xs font-medium"
          style={{
            top: `${getEvaluationBarHeight(evaluation) - 10}%`,
            color: evaluation && evaluation > 0 ? "#1a1a1a" : "#f9f9f9",
            textShadow: "0px 0px 2px rgba(0,0,0,0.5)",
          }}
        >
          {formatEvaluation(evaluation)}
        </div>
      </div>

      {/* Scacchiera */}
      <div className="ml-4">
        <Chessboard
          position={fen}
          boardWidth={boardWidth}
          areArrowsAllowed={true}
          onSquareClick={onSquareClick}
          customSquareStyles={
            lastMove
              ? {
                  [lastMove.from]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)",
                  },
                  [lastMove.to]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
                }
              : {}
          }
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
      </div>
    </div>
  );
};

export default ChessboardWithEvaluation;
