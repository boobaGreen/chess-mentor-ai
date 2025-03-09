import React from "react";
import { Chessboard } from "react-chessboard";
import { Card, CardContent } from "../../components/ui/card";

interface ChessboardWithEvaluationProps {
  fen: string;
  evaluation: number | string;
  showEvalBar: boolean;
  calculateAdvantagePercentage: (eval_: number | string) => number;
  formatEvaluation: (eval_: number | string) => string;
  boardWidth?: number;
}

const ChessboardWithEvaluation: React.FC<ChessboardWithEvaluationProps> = ({
  fen,
  evaluation,
  showEvalBar,
  calculateAdvantagePercentage,
  formatEvaluation,
  boardWidth = 400,
}) => {
  return (
    <Card className="mb-4 w-full">
      <CardContent className="p-2">
        {/* Container principale con flex per miglior centramento */}
        <div className="relative w-full flex justify-center">
          {/* Barra di valutazione */}
          {showEvalBar && (
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-200 rounded-l-lg overflow-hidden z-10">
              {/* Parte nera (in alto) */}
              <div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-gray-600"
                style={{
                  height: `${100 - calculateAdvantagePercentage(evaluation)}%`,
                  transition: "height 0.3s ease-in-out",
                }}
              ></div>

              {/* Parte bianca (in basso) */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-gray-300"
                style={{
                  height: `${calculateAdvantagePercentage(evaluation)}%`,
                  transition: "height 0.3s ease-in-out",
                }}
              ></div>

              <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-400"></div>

              {/* Mostra la valutazione numerica */}
              <div
                className="absolute text-[8px] text-white font-bold px-0.5 right-0 transform -translate-y-1/2"
                style={{
                  top: `${100 - calculateAdvantagePercentage(evaluation)}%`,
                  opacity:
                    typeof evaluation === "number" && Math.abs(evaluation) > 0.3
                      ? 1
                      : 0,
                  transition: "top 0.3s ease-in-out",
                }}
              >
                {formatEvaluation(evaluation)}
              </div>
            </div>
          )}

          {/* Scacchiera - ottimizzata per barra di valutazione */}
          <div
            className={`chessboard-container`}
            style={{
              paddingLeft: showEvalBar ? "8px" : "0", // Aggiungi padding solo se la barra è visibile
              maxWidth: "100%",
            }}
          >
            <Chessboard
              position={fen}
              boardWidth={boardWidth}
              areArrowsAllowed={true}
              arePiecesDraggable={false}
              customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChessboardWithEvaluation;
