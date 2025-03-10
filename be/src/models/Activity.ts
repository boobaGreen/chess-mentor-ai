import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  userId: string;
  type: "puzzle" | "game" | "coordinates" | "lesson" | "analysis";
  details: {
    result: boolean;
    score?: number;
    timeSpent: number;
    difficulty?: number;
    opening?: string;
    opponent?: "bot" | "human";
    botLevel?: number;
  };
  metadata: {
    pgn?: string;
    puzzleId?: string;
    lessonId?: string;
    concepts: string[];
  };
  timestamp: Date;
}

const activitySchema = new Schema({
  userId: { type: String, required: true },
  type: {
    type: String,
    enum: ["puzzle", "game", "coordinates", "lesson", "analysis"],
    required: true,
  },
  details: {
    result: { type: Boolean, required: true },
    score: Number,
    timeSpent: { type: Number, required: true },
    difficulty: Number,
    opening: String,
    opponent: { type: String, enum: ["bot", "human"] },
    botLevel: Number,
  },
  metadata: {
    pgn: String,
    puzzleId: String,
    lessonId: String,
    concepts: [{ type: String }],
  },
  timestamp: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>("Activity", activitySchema);
