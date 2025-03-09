import React from "react";
import { Badge } from "../ui/badge";
import { CalendarDays, Info, Crown } from "lucide-react";

interface GameHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameInfo: any;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">{gameInfo.event}</h2>
          <div className="flex items-center text-gray-600 mt-1">
            <CalendarDays className="h-4 w-4 mr-1" /> {gameInfo.date}
            <span className="mx-2">•</span>
            <Info className="h-4 w-4 mr-1" /> {gameInfo.round}
          </div>
        </div>

        <div className="flex flex-col md:items-end">
          <div className="flex items-center mb-2">
            <Badge className="mr-2">{gameInfo.eco}</Badge>
            <span className="text-sm">{gameInfo.opening}</span>
          </div>
          <div className="flex items-center">
            <Badge
              variant={
                gameInfo.result === "1-0"
                  ? "default"
                  : gameInfo.result === "0-1"
                  ? "destructive"
                  : "outline"
              }
            >
              {gameInfo.result}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center">
            <Crown className="h-5 w-5 text-amber-600" />
          </div>
          <div className="ml-3">
            <p className="font-medium">White</p>
            <p className="text-sm">{gameInfo.white}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <Crown className="h-5 w-5 text-gray-300" />
          </div>
          <div className="ml-3">
            <p className="font-medium">Black</p>
            <p className="text-sm">{gameInfo.black}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
