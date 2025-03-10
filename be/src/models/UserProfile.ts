import mongoose, { Document, Schema } from "mongoose";

export interface IUserProfile extends Document {
  userId: string;
  initialLevel: number;
  currentLevel: number;
  botSettings: {
    depth: number;
    skill: number;
    autoAdjust: boolean;
  };
  learningPath: {
    currentTopics: string[];
    masteredTopics: string[];
    openings: {
      studying: string[];
      mastered: string[];
    };
  };
  strengths: string[];
  weaknesses: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    initialLevel: { type: Number, default: 1200 },
    currentLevel: { type: Number, default: 1200 },
    botSettings: {
      depth: { type: Number, default: 5 },
      skill: { type: Number, default: 5 },
      autoAdjust: { type: Boolean, default: true },
    },
    learningPath: {
      currentTopics: [String],
      masteredTopics: [String],
      openings: {
        studying: [String],
        mastered: [String],
      },
    },
    strengths: [String],
    weaknesses: [String],
  },
  { timestamps: true }
);

export const UserProfile = mongoose.model<IUserProfile>(
  "UserProfile",
  userProfileSchema
);
