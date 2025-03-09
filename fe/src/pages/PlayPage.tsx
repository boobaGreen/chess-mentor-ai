import React, { useState, useEffect } from "react";
import useChessboardSize from "../hooks/useChessboardSize";
import { Chess } from "chess.js";
import useStockfish from "../hooks/useStockfish";
import ChessboardComponent from "../components/play/ChessboardComponent";
import MoveHistory from "../components/play/MoveHistory";
import ControlPanel from "../components/play/ControlPanel";
import { Play } from "lucide-react";
import PageTitle from "../components/ui/page-title";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const PlayPage: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [turn, setTurn] = useState("white");
  const [skillLevel, setSkillLevel] = useState(0); // Default skill level
  const [depth, setDepth] = useState(1); // Default depth
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showUndo, setShowUndo] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [showSkill, setShowSkill] = useState(true);
  const [showDepth, setShowDepth] = useState(true);

  const { getBestMove } = useStockfish(skillLevel, depth);

  const boardWidth = useChessboardSize();
  useEffect(() => {
    if (turn === "black") {
      setTimeout(makeBotMove, 500); // make bot move after 500ms
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  const handleMove = (sourceSquare: string, targetSquare: string): boolean => {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for simplicity
    });

    if (result) {
      console.log(`User move: ${sourceSquare}-${targetSquare}`);
      setGame(gameCopy);
      setFen(gameCopy.fen());
      setTurn("black");
      setMoveHistory([
        ...moveHistory,
        `White: ${sourceSquare}-${targetSquare}`,
      ]);
      checkGameStatus(gameCopy);
      return true;
    }
    return false;
  };

  const makeBotMove = () => {
    getBestMove(game.fen(), (bestMove) => {
      const gameCopy = new Chess(game.fen());
      gameCopy.move({
        from: bestMove.substring(0, 2),
        to: bestMove.substring(2, 4),
        promotion: "q", // always promote to a queen for simplicity
      });
      console.log(`Bot move: ${bestMove}`);
      setGame(gameCopy);
      setFen(gameCopy.fen());
      setTurn("white");
      setMoveHistory([
        ...moveHistory,
        `Black: ${bestMove.substring(0, 2)}-${bestMove.substring(2, 4)}`,
      ]);
      checkGameStatus(gameCopy);
    });
  };

  const checkGameStatus = (game: Chess) => {
    if (game.isCheckmate()) {
      setMessage("Checkmate!");
    } else if (game.inCheck()) {
      setMessage("Check!");
    } else if (game.isDraw()) {
      setMessage("Draw!");
    } else {
      setMessage("");
    }
  };

  const undoMove = () => {
    console.log("Before undo:", game.fen());
    console.log("Current move history:", moveHistory);

    if (moveHistory.length > 0) {
      // Create a new game from scratch
      const newGame = new Chess();

      // Handle based on how many moves have been made
      if (moveHistory.length >= 2) {
        console.log("Undoing two moves");

        // Get the move history up to the point we want to rollback to
        const newHistory = moveHistory.slice(0, -2);

        // Replay all moves except the last two
        if (newHistory.length > 0) {
          // Replay the moves on the new game
          newHistory.forEach((historyItem) => {
            const parts = historyItem.split(": ")[1].split("-");
            const from = parts[0];
            const to = parts[1];

            newGame.move({
              from: from,
              to: to,
              promotion: "q",
            });
          });
        }

        setMoveHistory(newHistory);
      } else {
        // Only one move has been made, reset to starting position
        console.log("Undoing one move");
        setMoveHistory([]);
        // newGame is already at starting position
      }

      console.log("After undo:", newGame.fen());

      // Update state with the new position
      setGame(newGame);
      setFen(newGame.fen());

      // Always set turn to white after undoing moves
      setTurn("white");

      setMessage("");
    }
  };

  const handleToggleUndo = () => {
    if (!showHistory && !showUndo) {
      setShowHistory(true);
    }
    setShowUndo(!showUndo);
  };

  const handleToggleHistory = () => {
    if (showHistory && showUndo) {
      setShowUndo(false);
    }
    setShowHistory(!showHistory);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <PageTitle icon={Play} title="Play vs Computer" />
      </div>

      <div className="mt-6">
        <Card className="border-b-4 border-primary mb-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-medium mr-2">Status:</span>
              {message ? (
                <Badge
                  variant={
                    message.includes("Check") ? "destructive" : "default"
                  }
                >
                  {message}
                </Badge>
              ) : (
                <Badge variant="outline">
                  {turn === "white" ? "Your Turn" : "Computer Thinking..."}
                </Badge>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Playing as:</span>
              <Badge variant="secondary">White</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Chessboard */}
          <div className="lg:col-span-8">
            <Card>
              <CardContent className="p-4 flex justify-center">
                <div className="chessboard-container">
                  <ChessboardComponent
                    fen={fen}
                    turn={turn}
                    handleMove={handleMove}
                    boardWidth={boardWidth}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Controls & History */}
          <div className="lg:col-span-4">
            {showHistory && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <MoveHistory
                    moveHistory={moveHistory}
                    message={message}
                    undoMove={showUndo ? undoMove : undefined}
                  />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-4">
                <ControlPanel
                  skillLevel={skillLevel}
                  setSkillLevel={setSkillLevel}
                  depth={depth}
                  setDepth={setDepth}
                  showUndo={showUndo}
                  setShowUndo={handleToggleUndo}
                  showHistory={showHistory}
                  setShowHistory={handleToggleHistory}
                  showSkill={showSkill}
                  setShowSkill={setShowSkill}
                  showDepth={showDepth}
                  setShowDepth={setShowDepth}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
