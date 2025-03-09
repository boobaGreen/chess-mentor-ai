import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ChartBarIcon } from "lucide-react";

interface MoveHistoryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any[];
  currentMoveIndex: number;
  goToMove: (index: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameInfo: any;
  toggleEvalBar: () => void;
  showEvalBar: boolean;
}

const MoveHistory: React.FC<MoveHistoryProps> = ({
  history,
  currentMoveIndex,
  goToMove,
  gameInfo,
  toggleEvalBar,
  showEvalBar,
}) => {
  // Funzione per organizzare le mosse in coppie (bianco/nero)
  const getMovePairs = () => {
    const pairs = [];
    for (let i = 0; i < history.length; i += 2) {
      pairs.push({
        moveNumber: Math.floor(i / 2) + 1,
        white: history[i],
        black: i + 1 < history.length ? history[i + 1] : null,
      });
    }
    return pairs;
  };

  const movePairs = getMovePairs();

  return (
    <Card>
      <CardHeader className="py-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Mosse della partita</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={showEvalBar ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={toggleEvalBar}
            >
              <ChartBarIcon className="h-4 w-4 mr-1" />
              {showEvalBar ? "Nascondi Eval" : "Mostra Eval"}
            </Button>
            <Badge variant="outline">{gameInfo.result || "In corso"}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="moves-container h-60 overflow-y-auto pr-2">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground">
                <th className="font-medium p-2 w-12">#</th>
                <th className="font-medium p-2">Bianco</th>
                <th className="font-medium p-2">Nero</th>
              </tr>
            </thead>
            <tbody>
              {movePairs.map((pair, pairIndex) => (
                <tr key={pairIndex}>
                  <td className="p-2 text-sm text-muted-foreground">
                    {pair.moveNumber}.
                  </td>
                  <td className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={
                        currentMoveIndex === pairIndex * 2
                          ? "bg-primary/20"
                          : ""
                      }
                      onClick={() => goToMove(pairIndex * 2)}
                    >
                      {pair.white?.san}
                    </Button>
                  </td>
                  <td className="p-2">
                    {pair.black && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          currentMoveIndex === pairIndex * 2 + 1
                            ? "bg-primary/20"
                            : ""
                        }
                        onClick={() => goToMove(pairIndex * 2 + 1)}
                      >
                        {pair.black.san}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoveHistory;
