export interface LeaderboardEntry {
  user_name: string;
  time: number;
  elo: number;
  game_mode: "type" | "click";
  created_at: string;
}

export interface GameResult {
  time: number;
  correct: number;
  total: number;
}

export interface GameState {
  isPlaying: boolean;
  targetSquare: string;
  timer: number;
  correctAnswers: number;
  userInput: string;
  gameMode: "type" | "click";
  showCoordinates: boolean;
}
