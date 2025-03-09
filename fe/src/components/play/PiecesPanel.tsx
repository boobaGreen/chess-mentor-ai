import React from "react";
import { Button } from "../ui/button";

interface PiecesPanelProps {
  pieceToPlace: string | null;
  setPieceToPlace: (piece: string | null) => void;
}

const PiecesPanel: React.FC<PiecesPanelProps> = ({
  pieceToPlace,
  setPieceToPlace,
}) => {
  const pieces = [
    { type: "p", label: "Pawn", white: "♙", black: "♟" },
    { type: "n", label: "Knight", white: "♘", black: "♞" },
    { type: "b", label: "Bishop", white: "♗", black: "♝" },
    { type: "r", label: "Rook", white: "♖", black: "♜" },
    { type: "q", label: "Queen", white: "♕", black: "♛" },
  ];

  return (
    <div className="p-4 border border-gray-300 rounded bg-gray-100 flex flex-col w-full">
      <h2 className="text-xl font-bold mb-2 text-center">Pieces</h2>
      <p className="text-sm mb-2 text-center">
        Select a piece to place on the board
      </p>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {pieces.map((piece) => (
          <div key={piece.type} className="flex flex-col">
            <Button
              onClick={() => setPieceToPlace(piece.type.toUpperCase())}
              variant={
                pieceToPlace === piece.type.toUpperCase()
                  ? "default"
                  : "outline"
              }
              className="p-2"
            >
              <div className="text-xl">{piece.white}</div>
            </Button>
            <Button
              onClick={() => setPieceToPlace(piece.type.toLowerCase())}
              variant={
                pieceToPlace === piece.type.toLowerCase()
                  ? "default"
                  : "outline"
              }
              className="p-2"
            >
              <div className="text-xl">{piece.black}</div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PiecesPanel;
