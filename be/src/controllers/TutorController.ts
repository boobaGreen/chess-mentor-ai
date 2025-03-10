import { Request, Response } from "express";
import { TutorService } from "../services/TutorService";
import { Activity } from "../models/Activity";
import { catchAsync } from "../utils/catchAsync";
import { ActivityRequest } from "../types/activity";
import { AIService } from "../services/AIService";

type CustomRequest = Request & {
  user?: {
    id: string;
    email?: string;
    name?: string;
  };
};

export class TutorController {
  private tutorService: TutorService;

  constructor() {
    const aiService = new AIService();
    this.tutorService = new TutorService(aiService);
  }
  getDailyRecommendations = catchAsync(
    async (req: CustomRequest, res: Response) => {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const plan = await this.tutorService.generatePersonalizedPlan(userId);
      res.json(plan);
    }
  );
  logActivity = catchAsync(
    async (req: CustomRequest & { body: ActivityRequest }, res: Response) => {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      try {
        const { type, result, concepts } = req.body;

        const activityData = {
          userId,
          type,
          details: {
            result: result.success,
            timeSpent: result.timeSpent,
            score: result.score,
            difficulty: result.difficulty,
            opening: result.opening,
            opponent: result.opponent,
            botLevel: result.botLevel,
          },
          metadata: {
            pgn: result.pgn,
            puzzleId: result.puzzleId,
            lessonId: result.lessonId,
            concepts: concepts || [],
          },
          timestamp: new Date(),
        };

        console.log(
          "Creating activity with data:",
          JSON.stringify(activityData, null, 2)
        );

        const activity = new Activity(activityData);
        await activity.save();

        const savedActivity = await Activity.findById(activity._id).lean();
        console.log("Saved activity:", JSON.stringify(savedActivity, null, 2));

        res.status(201).json({
          success: true,
          activity: savedActivity,
        });
      } catch (error) {
        console.error("Activity logging error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to log activity",
          error:
            process.env.NODE_ENV === "development"
              ? (error as Error).message
              : undefined,
        });
      }
    }
  );

  getActivityHistory = catchAsync(async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const activities = await Activity.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    console.log("Retrieved activities:", JSON.stringify(activities, null, 2));

    res.json({
      success: true,
      activities: activities.map((activity) => ({
        id: activity._id,
        type: activity.type,
        details: activity.details || {},
        metadata: {
          pgn: activity.metadata?.pgn,
          puzzleId: activity.metadata?.puzzleId,
          lessonId: activity.metadata?.lessonId,
          concepts: activity.metadata?.concepts || [],
        },
        timestamp: activity.timestamp,
      })),
    });
  });
}
