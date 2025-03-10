import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { useToast } from "../components/ui/use-toast";
import { supabase } from "../lib/supabase";

interface LeaderboardEntry {
  user_name: string;
  time: number;
  elo: number;
  game_mode: "type" | "click";
  created_at: string;
}

interface GameResult {
  time: number;
  correct: number;
  total: number;
}

interface GameHistory {
  square: string;
  wasCorrect: boolean;
  timeSpent: number;
}

interface GameState {
  isPlaying: boolean;
  timer: number;
  correctAnswers: number;
  attemptsLeft: number;
  targetSquare: string;
  lastResult: GameResult | null;
  gameHistory: GameHistory[];
}

interface TypeGameState extends GameState {
  userInput: string;
}

const TOTAL_ATTEMPTS = 30;
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const SQUARES = FILES.flatMap((file) => RANKS.map((rank) => `${file}${rank}`));

export const useSquaresGame = (
  user: User | null,
  toast: ReturnType<typeof useToast>
) => {
  const [gameMode, setGameMode] = useState<"type" | "click">("type");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const [typeGame, setTypeGame] = useState<TypeGameState>({
    isPlaying: false,
    timer: 0,
    correctAnswers: 0,
    attemptsLeft: TOTAL_ATTEMPTS,
    targetSquare: "",
    userInput: "",
    lastResult: null,
    gameHistory: [],
  });

  const [clickGame, setClickGame] = useState<GameState>({
    isPlaying: false,
    timer: 0,
    correctAnswers: 0,
    attemptsLeft: TOTAL_ATTEMPTS,
    targetSquare: "",
    lastResult: null,
    gameHistory: [],
  });

  // Get current game state based on mode
  const currentGame = gameMode === "type" ? typeGame : clickGame;
  const setCurrentGame = (
    gameMode === "type" ? setTypeGame : setClickGame
  ) as React.Dispatch<React.SetStateAction<GameState | TypeGameState>>;

  const getRandomSquare = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SQUARES.length);
    return SQUARES[randomIndex];
  }, []);

  const startGame = useCallback(() => {
    const initialSquare = getRandomSquare();
    setCurrentGame((prev: GameState | TypeGameState) => ({
      ...prev,
      isPlaying: true,
      timer: 0,
      correctAnswers: 0,
      attemptsLeft: TOTAL_ATTEMPTS,
      targetSquare: initialSquare,
      userInput: "",
      lastResult: null,
      gameHistory: [],
    }));
  }, [getRandomSquare, setCurrentGame]);

  const saveToleaderboard = async (finalTime: number) => {
    try {
      await supabase.from("squares_leaderboard").insert({
        user_id: user?.id,
        user_name: user?.user_metadata.full_name,
        time: finalTime,
        game_mode: gameMode,
        elo: 1500,
      });
      loadLeaderboard();
      toast.toast({
        title: "Congratulations!",
        description: `Perfect score! Time: ${finalTime}s`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving score:", error);
      toast.toast({
        title: "Error",
        description: "Failed to save your score",
        variant: "destructive",
      });
    }
  };

  const handleCorrectAnswer = useCallback(() => {
    setCurrentGame((prev: GameState | TypeGameState) => {
      const newCorrect = prev.correctAnswers + 1;
      const newAttemptsLeft = prev.attemptsLeft - 1;
      const newHistory = [
        ...prev.gameHistory,
        { square: prev.targetSquare, wasCorrect: true, timeSpent: prev.timer },
      ];

      if (newAttemptsLeft > 0) {
        return {
          ...prev,
          correctAnswers: newCorrect,
          attemptsLeft: newAttemptsLeft,
          targetSquare: getRandomSquare(),
          gameHistory: newHistory,
        };
      } else {
        const finalResult = {
          time: prev.timer,
          correct: newCorrect,
          total: TOTAL_ATTEMPTS,
        };

        if (newCorrect === TOTAL_ATTEMPTS) {
          saveToleaderboard(prev.timer);
        }

        return {
          ...prev,
          isPlaying: false,
          correctAnswers: newCorrect,
          attemptsLeft: newAttemptsLeft,
          gameHistory: newHistory,
          lastResult: finalResult,
        };
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRandomSquare, setCurrentGame]);

  const handleWrongAnswer = useCallback(
    (attempted: string) => {
      setCurrentGame((prev: GameState | TypeGameState) => {
        const newAttemptsLeft = prev.attemptsLeft - 1;
        const newHistory = [
          ...prev.gameHistory,
          {
            square: prev.targetSquare,
            wasCorrect: false,
            timeSpent: prev.timer,
          },
        ];

        toast.toast({
          title: "Wrong square!",
          description: `You ${
            gameMode === "type" ? "typed" : "clicked"
          } ${attempted}, but the target was ${prev.targetSquare}`,
          variant: "destructive",
        });

        if (newAttemptsLeft > 0) {
          return {
            ...prev,
            attemptsLeft: newAttemptsLeft,
            targetSquare: getRandomSquare(),
            gameHistory: newHistory,
          };
        } else {
          return {
            ...prev,
            isPlaying: false,
            attemptsLeft: newAttemptsLeft,
            gameHistory: newHistory,
            lastResult: {
              time: prev.timer,
              correct: prev.correctAnswers,
              total: TOTAL_ATTEMPTS,
            },
          };
        }
      });
    },
    [gameMode, getRandomSquare, setCurrentGame, toast]
  );

  const handleSquareClick = useCallback(
    (square: string) => {
      if (!currentGame.isPlaying || gameMode !== "click") return;

      if (square === currentGame.targetSquare) {
        handleCorrectAnswer();
      } else {
        handleWrongAnswer(square);
      }
    },
    [currentGame, gameMode, handleCorrectAnswer, handleWrongAnswer]
  );

  const handleInputSubmit = useCallback(() => {
    if (!currentGame.isPlaying || gameMode !== "type") return;

    if (
      typeGame.userInput.toLowerCase() === typeGame.targetSquare.toLowerCase()
    ) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer(typeGame.userInput);
    }
    setTypeGame((prev) => ({ ...prev, userInput: "" }));
  }, [currentGame, gameMode, typeGame, handleCorrectAnswer, handleWrongAnswer]);

  const abandonGame = useCallback(() => {
    setCurrentGame((prev: GameState | TypeGameState) => ({
      ...prev,
      isPlaying: false,
      lastResult: {
        time: prev.timer,
        correct: prev.correctAnswers,
        total: TOTAL_ATTEMPTS,
      },
    }));
    toast.toast({
      title: "Game Abandoned",
      description: `Final score: ${currentGame.correctAnswers}/${TOTAL_ATTEMPTS}`,
      variant: "destructive",
    });
  }, [currentGame, setCurrentGame, toast]);

  const loadLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("squares_leaderboard")
        .select("*")
        .eq("game_mode", gameMode)
        .order("time", { ascending: true })
        .limit(10);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
      toast.toast({
        title: "Error",
        description: "Failed to load leaderboard",
        variant: "destructive",
      });
    }
  }, [gameMode, toast]);

  // Load leaderboard on mount and game mode change
  useEffect(() => {
    loadLeaderboard();
  }, [gameMode, loadLeaderboard]);

  // Separate timer effects for each game mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (typeGame.isPlaying) {
      interval = setInterval(() => {
        setTypeGame((prev) => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [typeGame.isPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (clickGame.isPlaying) {
      interval = setInterval(() => {
        setClickGame((prev) => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clickGame.isPlaying]);

  return {
    // Game state
    gameMode,
    setGameMode,
    isPlaying: currentGame.isPlaying,
    targetSquare: currentGame.targetSquare,
    timer: currentGame.timer,
    correctAnswers: currentGame.correctAnswers,
    attemptsLeft: currentGame.attemptsLeft,
    userInput: typeGame.userInput,
    setUserInput: (input: string) =>
      setTypeGame((prev) => ({ ...prev, userInput: input })),
    gameHistory: currentGame.gameHistory,

    // Results and leaderboard
    leaderboard,
    lastResult: currentGame.lastResult,

    // Actions
    startGame,
    handleSquareClick,
    handleInputSubmit,
    abandonGame,
  };
};
