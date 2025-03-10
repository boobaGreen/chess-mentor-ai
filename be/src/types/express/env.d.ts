declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGODB_URI: string;
      DEEPSEEK_API_KEY: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

// This empty export is needed to make this a module
export {};
