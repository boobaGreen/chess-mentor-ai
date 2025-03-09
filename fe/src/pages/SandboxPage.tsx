import React, { useState } from "react";
import { Chess, Square, Color } from "chess.js";
import { Chessboard } from "react-chessboard";
import MoveHistory from "../components/play/MoveHistory";
import PiecesPanel from "../components/play/PiecesPanel";
import ActionsPanel from "../components/play/ActionsPanel";
import { Box } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import PageTitle from "../components/ui/page-title";
import useChessboardSize from "../hooks/useChessboardSize";

// Posizione iniziale standard di una partita di scacchi
const INITIAL_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const SandboxPage: React.FC = () => {
  const [boardPosition, setBoardPosition] = useState(INITIAL_POSITION); // iniziare con posizione standard
  const [pieceToPlace, setPieceToPlace] = useState<string | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const boardWidth = useChessboardSize();
  // Reset to initial position
  const resetToInitial = () => {
    const initialPosition =
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    setBoardPosition(initialPosition);
    setMoveHistory([]);
    setMessage("Board reset to initial position");
  };

  // Clear the board but keep kings in standard positions
  const clearBoard = () => {
    // Create a FEN string with just kings in their starting positions
    const kingsOnlyFEN = "4k3/8/8/8/8/8/8/4K3 w - - 0 1";

    setBoardPosition(kingsOnlyFEN);
    setMoveHistory([
      ...moveHistory,
      "Board cleared (kings kept in standard positions)",
    ]);
    setMessage("Board cleared (kings in standard positions)");
  };

  // Handle clicking on squares to place pieces
  const handleSquareClick = (square: Square) => {
    console.log("Square clicked:", square);

    if (pieceToPlace) {
      console.log(
        "Attempting to place piece:",
        pieceToPlace,
        "on square:",
        square
      );

      // Determine piece color from case (uppercase is white, lowercase is black)
      const pieceColor =
        pieceToPlace === pieceToPlace.toUpperCase() ? "w" : "b";
      const pieceType = pieceToPlace.toLowerCase();

      try {
        // First check if we're placing a king and one already exists
        if (pieceType === "k") {
          // Get the current board state to find if there's already a king of this color
          const chess = new Chess(boardPosition);
          let hasKingOfSameColor = false;

          // Scan the board for kings of the same color
          for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
              const file = String.fromCharCode("a".charCodeAt(0) + c);
              const rank = 8 - r;
              const checkSquare = `${file}${rank}` as Square;
              const piece = chess.get(checkSquare);
              if (piece && piece.type === "k" && piece.color === pieceColor) {
                hasKingOfSameColor = true;
                break;
              }
            }
            if (hasKingOfSameColor) break;
          }

          if (hasKingOfSameColor) {
            setMessage(
              `Cannot place more than one ${
                pieceColor === "w" ? "white" : "black"
              } king`
            );
            return;
          }
        }

        // Now try to place the piece
        const chess = new Chess(boardPosition);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        chess.put({ type: pieceType as any, color: pieceColor }, square);
        const newFen = chess.fen();

        console.log("New FEN:", newFen);
        setBoardPosition(newFen);
        setMoveHistory([...moveHistory, `Added ${pieceToPlace} to ${square}`]);
        setMessage(`Placed ${pieceToPlace} on ${square}`);
      } catch (e) {
        console.error("Error placing piece:", e);
        setMessage(`Failed to place piece: ${e}`);
      }
    }
  };

  // Handle piece movement in sandbox mode
  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    // This function allows free movement of pieces
    const chess = new Chess(boardPosition);

    try {
      // For moving pieces (ignoring chess rules)
      const piece = chess.get(sourceSquare as Square);
      if (piece) {
        // Custom handling for king movements to avoid validation issues
        if (piece.type === "k") {
          // For kings, use direct FEN manipulation to avoid validation errors
          const fenParts = boardPosition.split(" ");
          const boardPart = fenParts[0];

          const board = fenToBoard(boardPart);

          // Get the source and target coordinates
          const sourceRow = 8 - parseInt(sourceSquare[1]);
          const sourceCol = sourceSquare.charCodeAt(0) - "a".charCodeAt(0);
          const targetRow = 8 - parseInt(targetSquare[1]);
          const targetCol = targetSquare.charCodeAt(0) - "a".charCodeAt(0);

          // Get the king character ('K' or 'k')
          const kingChar = piece.color === "w" ? "K" : "k";

          // Move the king
          board[sourceRow][sourceCol] = null;
          board[targetRow][targetCol] = kingChar;

          // Convert back to FEN
          const newBoardPart = boardToFen(board);
          fenParts[0] = newBoardPart;

          const newFen = fenParts.join(" ");
          setBoardPosition(newFen);
          setMoveHistory([
            ...moveHistory,
            `Moved king from ${sourceSquare} to ${targetSquare}`,
          ]);
          return true;
        }

        // For non-king pieces, use our existing logic
        // Remove piece from source
        let newPosition = removePieceFromPosition(boardPosition, sourceSquare);
        // Add piece to target
        newPosition = addPieceToPosition(
          newPosition,
          piece.type,
          targetSquare,
          piece.color
        );
        setBoardPosition(newPosition);
        setMoveHistory([
          ...moveHistory,
          `Moved ${piece.type} from ${sourceSquare} to ${targetSquare}`,
        ]);
        return true;
      }

      return false;
    } catch (e) {
      console.error("Error moving piece:", e);
      return false;
    }
  };

  // Helper function to convert FEN board representation to a 2D array
  const fenToBoard = (fen: string): (string | null)[][] => {
    const rows = fen.split("/");
    const board: (string | null)[][] = [];

    for (const row of rows) {
      const boardRow: (string | null)[] = [];
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (/\d/.test(char)) {
          // It's a number, representing empty squares
          const emptyCount = parseInt(char);
          for (let j = 0; j < emptyCount; j++) {
            boardRow.push(null);
          }
        } else {
          // It's a piece
          boardRow.push(char);
        }
      }
      board.push(boardRow);
    }

    return board;
  };

  // Helper function to convert a 2D array to FEN board representation
  const boardToFen = (board: (string | null)[][]): string => {
    const fenRows: string[] = [];

    for (const row of board) {
      let fenRow = "";
      let emptyCount = 0;

      for (const cell of row) {
        if (cell === null) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            fenRow += emptyCount.toString();
            emptyCount = 0;
          }
          fenRow += cell;
        }
      }

      if (emptyCount > 0) {
        fenRow += emptyCount.toString();
      }

      fenRows.push(fenRow);
    }

    return fenRows.join("/");
  };

  // Helper function to add a piece to a position
  const addPieceToPosition = (
    fen: string,
    pieceType: string,
    square: string,
    color: Color = "w"
  ) => {
    const chess = new Chess(fen);
    try {
      // Use chess.js built-in methods when possible
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chess.put({ type: pieceType as any, color: color }, square as Square);
      return chess.fen();
    } catch (e) {
      console.error("Error adding piece:", e);
      return fen;
    }
  };

  // Helper function to remove a piece from a position
  const removePieceFromPosition = (fen: string, square: string) => {
    const chess = new Chess(fen);
    // Create a new position with the piece removed
    chess.remove(square as Square);
    return chess.fen();
  };

  // Update the startGameFromPosition function
  const startGameFromPosition = () => {
    // In the future, this will redirect to PlayPage with the current position
    setMessage(
      "In a future implementation, this will start a game with this position"
    );

    // Future implementation would look something like this:
    // navigate('/partita', { state: { initialPosition: boardPosition } });
  };

  // Add this function for starting puzzles
  const startPuzzleFromPosition = () => {
    // In the future, this will allow creating a puzzle from this position
    setMessage(
      "In a future implementation, this will create a puzzle from this position"
    );

    // Future implementation would look something like this:
    // navigate('/puzzle/create', { state: { initialPosition: boardPosition } });
  };

  // Right-click to remove pieces
  const handleRightClick = (square: string) => {
    // Check if the square contains a king
    const chess = new Chess(boardPosition);
    const piece = chess.get(square as Square);

    if (piece && piece.type === "k") {
      // Don't allow removing kings
      setMessage(
        "Kings cannot be removed. Use 'Clear Board' to remove all pieces."
      );
      return false;
    }

    // For non-king pieces, proceed with removal
    const newPosition = removePieceFromPosition(boardPosition, square);
    setBoardPosition(newPosition);
    setMoveHistory([...moveHistory, `Removed piece from ${square}`]);
    return false; // Prevent default context menu
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <PageTitle icon={Box} title="Sandbox Mode" />

        <Card className="border-b-4 border-primary mb-6 w-full max-w-5xl">
          <CardContent className="p-4">
            <p className="text-lg text-center text-muted-foreground">
              Create and experiment with any chess position. Perfect for setting
              up specific scenarios or practicing particular positions.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl">
          {/* Left column - Chessboard - usando la stessa struttura di PlayPage */}
          <div className="lg:col-span-8">
            <Card>
              <CardContent className="p-4 flex justify-center">
                <div className="chessboard-container">
                  <Chessboard
                    position={boardPosition}
                    onPieceDrop={handlePieceDrop}
                    onSquareClick={handleSquareClick}
                    onSquareRightClick={handleRightClick}
                    boardWidth={boardWidth}
                    customBoardStyle={{
                      cursor: pieceToPlace ? "pointer" : "grab",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {message && (
              <Card className="mt-4">
                <CardContent className="p-3">
                  <div className="text-blue-800">{message}</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column - Controls & History - usando la stessa struttura di PlayPage */}
          <div className="lg:col-span-4">
            <Card className="mb-6">
              <CardContent className="p-4">
                <PiecesPanel
                  pieceToPlace={pieceToPlace}
                  setPieceToPlace={setPieceToPlace}
                />
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-4">
                <ActionsPanel
                  clearBoard={clearBoard}
                  resetToInitial={resetToInitial}
                  startGameFromPosition={startGameFromPosition}
                  startPuzzleFromPosition={startPuzzleFromPosition}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <MoveHistory
                  moveHistory={moveHistory}
                  message=""
                  undoMove={undefined}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-8 p-4 w-full max-w-3xl">
          <CardContent>
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                • Select a piece from the panel and click where you want to
                place it
              </li>
              <li>• Drag pieces to move them around freely</li>
              <li>• Right-click a square to remove a piece</li>
              <li>
                • Kings cannot be removed with right-click, but can be moved
                freely
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SandboxPage;
