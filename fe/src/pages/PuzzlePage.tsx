import React, { useState } from "react";
import useChessboardSize from "../hooks/useChessboardSize";
import { Chess } from "chess.js";
import { Puzzle, RotateCcw, Trophy, Tag } from "lucide-react";
import ChessboardComponent from "../components/play/ChessboardComponent";
import MoveHistory from "../components/play/MoveHistory";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import PageTitle from "../components/ui/page-title";
const samplePuzzle = {
  fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
  moves: ["Qxf7#"],
  rating: 1200,
  theme: "mate-in-one",
  description: "Matto del barbiere. Trova la mossa vincente per il bianco.",
};

const PuzzlePage: React.FC = () => {
  const [fen, setFen] = useState(samplePuzzle.fen);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"initial" | "correct" | "wrong">(
    "initial"
  );

  const boardWidth = useChessboardSize();
  const handleMove = (sourceSquare: string, targetSquare: string): boolean => {
    try {
      const gameCopy = new Chess(fen);
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (move) {
        const isCorrect = move.san === samplePuzzle.moves[0];
        setFen(gameCopy.fen());
        setMoveHistory([
          ...moveHistory,
          `${
            move.color === "w" ? "White" : "Black"
          }: ${sourceSquare}-${targetSquare}`,
        ]);
        setStatus(isCorrect ? "correct" : "wrong");
        setMessage(isCorrect ? "Corretto! ✨" : "Sbagliato! Riprova.");
        return true;
      }
    } catch (e) {
      console.error("Invalid move:", e);
    }
    return false;
  };

  const resetPuzzle = () => {
    setFen(samplePuzzle.fen);
    setMoveHistory([]);
    setMessage("");
    setStatus("initial");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <PageTitle icon={Puzzle} title="Chess Puzzles" />

        <Card className="border-b-4 border-primary mb-6 w-full max-w-5xl">
          <CardContent className="p-4">
            <p className="text-lg text-center">{samplePuzzle.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-5xl">
          {/* Left column - Chessboard */}
          <div className="lg:col-span-8 flex flex-col items-center w-full">
            <Card className="w-full">
              <CardContent className="p-4 flex justify-center">
                <div className="chessboard-container w-full flex justify-center">
                  <ChessboardComponent
                    fen={fen}
                    turn="white"
                    handleMove={handleMove}
                    boardWidth={boardWidth}
                  />
                </div>
              </CardContent>
            </Card>

            {message && (
              <Card
                className={`mt-4 w-full ${
                  status === "correct"
                    ? "bg-green-50 border border-green-200"
                    : status === "wrong"
                    ? "bg-red-50 border border-red-200"
                    : "bg-blue-50 border border-blue-200"
                }`}
              >
                <CardContent className="p-2 flex items-center justify-center">
                  {status === "correct" && (
                    <Trophy className="h-5 w-5 mr-2 text-green-500" />
                  )}
                  <p
                    className={`text-center font-medium ${
                      status === "correct"
                        ? "text-green-700"
                        : status === "wrong"
                        ? "text-red-700"
                        : "text-blue-700"
                    }`}
                  >
                    {message}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column - Info and History */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-4">
                      <Trophy className="mr-2 h-4 w-4" />
                      Puzzle Info
                    </h3>

                    <div className="flex justify-between items-center mb-3">
                      <span className="text-muted-foreground">Rating</span>
                      <Badge variant="secondary" className="text-sm">
                        {samplePuzzle.rating}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <span className="text-muted-foreground">Theme</span>
                      <div className="flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        <span className="text-sm font-medium">
                          {samplePuzzle.theme}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-2 gap-2"
                      onClick={resetPuzzle}
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset Puzzle
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <MoveHistory
                  moveHistory={moveHistory}
                  message=""
                  undoMove={undefined} // Rimuoviamo questo pulsante poiché abbiamo già il reset
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzlePage;
