export interface GameInfo {
  white: string;
  black: string;
  event: string;
  site?: string;
  date: string;
  result: string;
  eco?: string;
  title?: string;
  pgn: string;
  evaluations: { [moveIndex: number]: number | string };
}

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export interface UserNote {
  id: string;
  moveNumber: number;
  note: string;
  timestamp: Date;
}

export interface Move {
  color: "w" | "b";
  piece: string;
  from: string;
  to: string;
  san: string;
  flags: string;
  lan: string;
  before: string;
  after: string;
}

export interface Analysis {
  depth: number;
  score: {
    type: "cp" | "mate";
    value: number;
  };
  variation: string[];
  principle_variation?: Move[];
}

export interface EngineEvaluation {
  fen: string;
  depth: number;
  score: number | string;
  bestMove?: string;
  pv?: string[];
}

export interface PersonalizedTip {
  id: string;
  text: string;
  category: "opening" | "middlegame" | "endgame" | "tactical" | "strategic";
  priority: number;
}

export interface LearningRecommendation {
  topic: string;
  reason: string;
  resources: {
    type: "video" | "article" | "puzzle" | "lesson";
    title: string;
    url: string;
  }[];
}
