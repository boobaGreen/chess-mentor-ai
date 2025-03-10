import { Activity } from "../models/Activity";
import { UserProfile } from "../models/UserProfile";

export class PerformanceService {
  private readonly RATING_K_FACTOR = 32;
  private readonly PERFORMANCE_WINDOW = 10; // Last N games to consider

  async adjustBotLevel(userId: string): Promise<{
    newDepth: number;
    newSkill: number;
    reason: string;
  }> {
    const recentGames = await Activity.find({
      userId,
      type: "game",
      "details.opponent": "bot",
    })
      .sort({ timestamp: -1 })
      .limit(this.PERFORMANCE_WINDOW);

    const profile = await UserProfile.findOne({ userId });
    if (!profile || recentGames.length === 0) {
      return {
        newDepth: 5,
        newSkill: 5,
        reason: "Insufficient data, using default settings",
      };
    }

    // Calculate win rate
    const winRate =
      recentGames.filter((game) => game.details.result).length /
      recentGames.length;

    // Calculate average time per move
    const avgTimeSpent =
      recentGames.reduce((sum, game) => sum + game.details.timeSpent, 0) /
      recentGames.length;

    let { depth, skill } = profile.botSettings;

    // Adjust based on performance
    if (winRate > 0.7) {
      // Player is doing too well, increase difficulty
      depth = Math.min(depth + 1, 15);
      skill = Math.min(skill + 1, 20);
      return {
        newDepth: depth,
        newSkill: skill,
        reason: "Win rate too high, increasing difficulty",
      };
    } else if (winRate < 0.3) {
      // Player is struggling, decrease difficulty
      depth = Math.max(depth - 1, 1);
      skill = Math.max(skill - 2, 0);
      return {
        newDepth: depth,
        newSkill: skill,
        reason: "Win rate too low, decreasing difficulty",
      };
    }

    return {
      newDepth: depth,
      newSkill: skill,
      reason: "Performance within optimal range",
    };
  }

  async calculateTopicPerformance(userId: string) {
    const activities = await Activity.find({
      userId,
      type: { $in: ["puzzle", "game"] },
    }).sort({ timestamp: -1 });

    const topicStats = new Map<
      string,
      { success: number; total: number; avgTime: number }
    >();

    activities.forEach((activity) => {
      activity.metadata.concepts.forEach((concept) => {
        const stats = topicStats.get(concept) || {
          success: 0,
          total: 0,
          avgTime: 0,
        };

        stats.total++;
        if (activity.details.result) stats.success++;
        stats.avgTime =
          (stats.avgTime * (stats.total - 1) + activity.details.timeSpent) /
          stats.total;

        topicStats.set(concept, stats);
      });
    });

    // Convert to array and calculate success rates
    return Array.from(topicStats.entries()).map(([topic, stats]) => ({
      topic,
      successRate: (stats.success / stats.total) * 100,
      averageTime: stats.avgTime,
      totalAttempts: stats.total,
    }));
  }
}
