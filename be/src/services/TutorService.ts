import { Activity, IActivity } from "../models/Activity";
import { UserProfile, IUserProfile } from "../models/UserProfile";
import { AIService } from "./AIService";

export class TutorService {
  constructor(private aiService: AIService) {}

  async generatePersonalizedPlan(userId: string) {
    const profile = await UserProfile.findOne({ userId });
    if (!profile) {
      throw new Error("User profile not found");
    }

    const activities = await Activity.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10);

    const messages = this.buildPrompt(profile, activities);
    const aiResponse = await this.aiService.getRecommendation(messages);

    return this.formatRecommendation(aiResponse);
  }

  private buildPrompt(
    profile: IUserProfile,
    activities: IActivity[]
  ): Array<{ role: string; content: string }> {
    const successRate =
      activities.length > 0
        ? activities.filter((a) => a.details.result).length / activities.length
        : 0;
    const recentConcepts = new Set(
      activities.flatMap((a) => a.metadata.concepts)
    );

    return [
      {
        role: "system",
        content:
          "You are an expert chess tutor providing personalized learning recommendations.",
      },
      {
        role: "user",
        content: `Analyze this chess student profile and provide recommendations:
Student Level: ${profile.currentLevel} (started at ${profile.initialLevel})
Recent Performance: ${Math.round(successRate * 100)}% success rate

Strengths: ${profile.strengths?.join(", ") || "None identified yet"}
Areas for Improvement: ${
          profile.weaknesses?.join(", ") || "None identified yet"
        }

Recent Topics: ${Array.from(recentConcepts).join(", ") || "No recent topics"}
Current Topics: ${
          profile.learningPath?.currentTopics?.join(", ") || "No current topics"
        }

Provide:
1. Next learning topics (2-3)
2. Specific exercises
3. Difficulty adjustments if needed
4. Concepts needing review`,
      },
    ];
  }

  private formatRecommendation(aiResponse: string): {
    nextTopics: string[];
    exercises: string[];
    difficultyAdjustment?: string;
    reviewConcepts: string[];
  } {
    try {
      const sections = aiResponse.split(/\d+\./);
      return {
        nextTopics: this.extractList(sections[1] || ""),
        exercises: this.extractList(sections[2] || ""),
        difficultyAdjustment: sections[3]?.trim(),
        reviewConcepts: this.extractList(sections[4] || ""),
      };
    } catch (error) {
      console.error("Error formatting AI response:", error);
      return {
        nextTopics: [],
        exercises: [],
        reviewConcepts: [],
      };
    }
  }

  private extractList(text: string): string[] {
    return text
      .split(/[\n•-]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  async updateUserProgress(userId: string, activityResult: boolean) {
    const profile = await UserProfile.findOne({ userId });
    if (!profile) throw new Error("User profile not found");

    const activity = new Activity({
      userId,
      type: "practice",
      details: { result: activityResult },
      timestamp: new Date(),
      metadata: {
        concepts: profile.learningPath?.currentTopics || [],
      },
    });

    await activity.save();
    await this.adjustDifficulty(profile, activityResult);
    return activity;
  }

  private async adjustDifficulty(profile: IUserProfile, success: boolean) {
    const recentActivities = await Activity.find({ userId: profile.userId })
      .sort({ timestamp: -1 })
      .limit(5);

    const successRate =
      recentActivities.filter((a) => a.details.result).length /
      recentActivities.length;

    if (successRate > 0.8 && profile.currentLevel < 2000) {
      profile.currentLevel += 50;
    } else if (successRate < 0.4 && profile.currentLevel > 800) {
      profile.currentLevel -= 25;
    }

    await profile.save();
    return profile;
  }
}
