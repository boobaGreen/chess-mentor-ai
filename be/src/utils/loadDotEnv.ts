import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

if (result.error) {
  throw new Error(
    `Failed to load environment variables: ${result.error.message}`
  );
}

export const env = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI!,
  deepseekApiKey: process.env.DEEPSEEK_API_KEY || "",
  nodeEnv: process.env.NODE_ENV || "development",
};
