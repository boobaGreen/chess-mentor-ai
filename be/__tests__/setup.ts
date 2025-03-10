import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
import path from "path";
import { jest } from "@jest/globals";

dotenv.config({ path: path.join(__dirname, "../.env") });

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Close any existing connections
  await mongoose.disconnect();

  // Create new in-memory database
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  console.log("Connected to in-memory database");
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
  console.log("Disconnected from in-memory database");
});

beforeEach(async () => {
  if (!mongoose.connection.db) {
    throw new Error("Database connection not established");
  }
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

jest.setTimeout(10000);
