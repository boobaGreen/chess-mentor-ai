import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

interface ChessboardComponentProps {
  fen: string;
  turn: string;
  handleMove: (sourceSquare: string, targetSquare: string) => boolean;
  boardWidth?: number;
}

const ChessboardComponent: React.FC<ChessboardComponentProps> = ({
  fen,
  turn,
  handleMove,
  boardWidth = 500,
}) => {
  // Stato interno per gestire le dimensioni effettive
  const [actualWidth, setActualWidth] = useState(boardWidth);

  // Effetto per forzare la dimensione corretta
  useEffect(() => {
    // Aggiorna la dimensione effettiva basandosi sulla prop
    setActualWidth(boardWidth);

    // Forza l'aggiornamento del DOM per garantire che la dimensione sia applicata
    const chessboardEls = document.querySelectorAll(".react-chessboard");
    chessboardEls.forEach((el) => {
      // Forza la dimensione via DOM
      (el as HTMLElement).style.width = `${boardWidth}px`;
      (el as HTMLElement).style.maxWidth = `${boardWidth}px`;
    });
  }, [boardWidth]);

  const onDrop = (sourceSquare: string, targetSquare: string): boolean => {
    if (turn === "white") {
      return handleMove(sourceSquare, targetSquare);
    }
    return false;
  };

  return (
    <div
      className="chessboard"
      style={{
        width: `${actualWidth}px`,
        maxWidth: `${actualWidth}px`,
        margin: "0 auto",
      }}
    >
      <Chessboard
        position={fen}
        boardWidth={actualWidth}
        onPieceDrop={onDrop}
        arePiecesDraggable={turn === "white"}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
          width: `${actualWidth}px`,
          maxWidth: `${actualWidth}px`,
        }}
      />
    </div>
  );
};

export default ChessboardComponent;
