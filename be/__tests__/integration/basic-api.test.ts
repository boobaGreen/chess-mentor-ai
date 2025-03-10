import request from "supertest";
import app from "../../src/index";
import { Server } from "http";
import mongoose from "mongoose";
import { Activity } from "../../src/models/Activity";

describe("API Endpoints", () => {
  let server: Server;

  beforeAll(async () => {
    server = app.listen(0); // Use port 0 for random available port
    await new Promise((resolve) => server.once("listening", resolve));
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect();
  });

  describe("GET /health", () => {
    it("should return OK status", async () => {
      const response = await request(server).get("/health");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "OK" });
    });
  });

  describe("POST /api/tutor/activity", () => {
    it("should create new activity", async () => {
      const activityData = {
        type: "puzzle",
        result: {
          success: true,
          timeSpent: 45,
          score: 100,
          difficulty: 3,
          opening: "Sicilian Defense",
          opponent: "bot",
          botLevel: 5,
        },
        concepts: ["pin tactics", "mate pattern"],
      };

      const response = await request(server)
        .post("/api/tutor/activity")
        .set("X-User-Id", "test-user-1")
        .send(activityData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.activity).toMatchObject({
        userId: "test-user-1",
        type: "puzzle",
        details: {
          result: true,
          timeSpent: 45,
          score: 100,
        },
      });

      // Verify activity was saved to database
      const savedActivity = await Activity.findById(response.body.activity._id);
      expect(savedActivity).toBeTruthy();
      expect(savedActivity?.type).toBe("puzzle");
    });

    it("should return 401 without user ID", async () => {
      const response = await request(server)
        .post("/api/tutor/activity")
        .send({
          type: "puzzle",
          result: { success: true },
        });

      expect(response.status).toBe(401);
    });
  });
});
