/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

const useStockfish = (skillLevel: number, depth: number) => {
  const stockfishRef = useRef<any>(null);

  useEffect(() => {
    stockfishRef.current = new Worker("/stockfish.js");
    stockfishRef.current.postMessage("uci");
    stockfishRef.current.postMessage(
      `setoption name Skill Level value ${skillLevel}`
    );

    return () => {
      stockfishRef.current.terminate();
    };
  }, [skillLevel]);

  const getBestMove = (fen: string, callback: (move: string) => void) => {
    stockfishRef.current.onmessage = (event: any) => {
      if (
        event &&
        typeof event.data === "string" &&
        event.data.startsWith("bestmove")
      ) {
        const bestMove = event.data.split(" ")[1];
        callback(bestMove);
      }
    };

    stockfishRef.current.postMessage(`position fen ${fen}`);
    stockfishRef.current.postMessage(`go depth ${depth}`);
  };

  return { getBestMove };
};

export default useStockfish;
