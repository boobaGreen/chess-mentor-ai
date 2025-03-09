import React from "react";

interface MoveHistoryProps {
  moveHistory: string[];
  message: string;
  undoMove?: () => void; // Make undoMove optional
}

const MoveHistory: React.FC<MoveHistoryProps> = ({
  moveHistory,
  message,
  undoMove,
}) => {
  return (
    <div className="ml-4">
      <h2 className="text-2xl font-bold text-gray-900">Move History</h2>
      <ul className="text-left">
        {moveHistory.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
      {message && (
        <div className="mt-4 p-2 border rounded bg-yellow-200 text-yellow-800">
          {message}
        </div>
      )}
      {undoMove && (
        <button
          onClick={undoMove}
          className="mt-4 p-2 border rounded bg-red-500 text-white"
        >
          Undo Move
        </button>
      )}
    </div>
  );
};

export default MoveHistory;
