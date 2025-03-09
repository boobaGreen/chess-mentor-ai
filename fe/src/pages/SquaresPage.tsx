import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { GameBoard } from "../components/squares/GameBoard";
import { LeaderboardTable } from "../components/squares/LeaderboardTable";
import { GameResult } from "../components/squares/GameResult";
import { useSquaresGame } from "../hooks/useSquareGames";

const SquaresPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [showCoordinates, setShowCoordinates] = useState(true);
  const game = useSquaresGame(user, toast);

  return (
    <div className="container mx-auto p-4">
      <Tabs
        defaultValue="type"
        onValueChange={(v) => game.setGameMode(v as "type" | "click")}
      >
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="type">Type Square</TabsTrigger>
            <TabsTrigger value="click">Find Square</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Switch
              checked={showCoordinates}
              onCheckedChange={setShowCoordinates}
              id="coordinates"
            />
            <label htmlFor="coordinates">Show Coordinates</label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Game Section - Takes 7 columns on desktop */}
          <div className="lg:col-span-7">
            {/* Game Results - Mobile: Above Board */}
            <div className="lg:hidden mb-4">
              {game.lastResult && (
                <GameResult
                  time={game.lastResult.time}
                  correct={game.lastResult.correct}
                  total={game.lastResult.total}
                  showCoordinates={showCoordinates}
                />
              )}
            </div>

            {/* Game Boards */}
            <TabsContent value="type" className="m-0">
              <GameBoard
                mode="type"
                isPlaying={game.isPlaying}
                showCoordinates={showCoordinates}
                targetSquare={game.targetSquare}
                timer={game.timer}
                correctAnswers={game.correctAnswers}
                attemptsLeft={game.attemptsLeft}
                userInput={game.userInput}
                setUserInput={game.setUserInput}
                onStart={game.startGame}
                onSubmit={game.handleInputSubmit}
                onAbandon={game.abandonGame}
              />
            </TabsContent>

            <TabsContent value="click" className="m-0">
              <GameBoard
                mode="click"
                isPlaying={game.isPlaying}
                showCoordinates={showCoordinates}
                targetSquare={game.targetSquare}
                timer={game.timer}
                correctAnswers={game.correctAnswers}
                attemptsLeft={game.attemptsLeft}
                onStart={game.startGame}
                onSquareClick={game.handleSquareClick}
                onAbandon={game.abandonGame}
              />
            </TabsContent>
          </div>

          {/* Right Side Content - Takes 5 columns on desktop */}
          <div className="lg:col-span-5 space-y-4">
            {/* Game Results - Desktop: Next to Board */}
            <div className="hidden lg:block">
              {game.lastResult && (
                <GameResult
                  time={game.lastResult.time}
                  correct={game.lastResult.correct}
                  total={game.lastResult.total}
                  showCoordinates={showCoordinates}
                />
              )}
            </div>

            {/* Leaderboard */}
            <LeaderboardTable
              gameMode={game.gameMode}
              entries={game.leaderboard}
            />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SquaresPage;
