export interface ActivityResult {
  success: boolean;
  timeSpent: number;
  score?: number;
  difficulty?: number;
  opening?: string;
  opponent?: "bot" | "human";
  botLevel?: number;
  pgn?: string;
  puzzleId?: string;
  lessonId?: string;
}

export interface ActivityRequest {
  type: "puzzle" | "game" | "coordinates" | "lesson" | "analysis";
  result: ActivityResult;
  concepts: string[];
}
