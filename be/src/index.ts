import express from "express";
import mongoose from "mongoose";
import { env } from "./utils/loadDotEnv";
import cors from "cors";
import tutorRoutes from "./routes/tutorRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tutor", tutorRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Only connect and start server if this file is run directly
if (require.main === module) {
  mongoose
    .connect(env.mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

export default app;
