import axios from "axios";
import { env } from "../utils/loadDotEnv";

interface DeepseekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_cache_hit_tokens: number;
    prompt_cache_miss_tokens: number;
  };
}

export class AIService {
  private readonly API_URL = "https://api.deepseek.com/v1/chat/completions";

  async getRecommendation(messages: Array<{ role: string; content: string }>) {
    try {
      console.log("Sending request to DeepSeek API...");
      const response = await axios.post<DeepseekResponse>(
        this.API_URL,
        {
          model: "deepseek-chat",
          messages,
          temperature: 0.3,
          max_tokens: 250,
          use_cache: true,
        },
        {
          headers: {
            Authorization: `Bearer ${env.deepseekApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const usage = response.data.usage;
      console.log("API Usage:", {
        inputTokens: usage.prompt_tokens,
        outputTokens: usage.completion_tokens,
        cacheHits: usage.prompt_cache_hit_tokens,
        cacheMisses: usage.prompt_cache_miss_tokens,
      });

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error("AI Service Error:", error.response?.data || error.message);
      throw new Error("Failed to get AI recommendation");
    }
  }
}
