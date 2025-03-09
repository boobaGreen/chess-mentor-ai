import React from "react";

interface MoveHistoryProps {
  moveHistory: string[];
  message: string;
  undoMove?: () => void;
}

const MoveHistory: React.FC<MoveHistoryProps> = ({
  moveHistory,
  message,
  undoMove,
}) => {
  return (
    <div
      className="ml-4 p-4 border border-gray-300 rounded bg-gray-100 flex flex-col"
      style={{ width: "250px" }}
    >
      <h2 className="text-xl font-bold mb-2">Move History</h2>

      {/* Scrollable container with fixed height */}
      <div
        className="overflow-y-auto mb-2"
        style={{ maxHeight: "300px", minHeight: "300px" }}
      >
        {moveHistory.length > 0 ? (
          <ul className="list-disc list-inside">
            {moveHistory.map((move, index) => (
              <li key={index} className="text-left">
                {move}
              </li>
            ))}
          </ul>
        ) : (
          <p>No moves yet</p>
        )}
      </div>

      {message && <p className="text-red-500 font-bold my-2">{message}</p>}
      {undoMove && (
        <button
          className="bg-yellow-600 text-black py-1 px-3 rounded mt-2 hover:bg-yellow-500"
          onClick={undoMove}
        >
          Undo Move
        </button>
      )}
    </div>
  );
};

export default MoveHistory;
