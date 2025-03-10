import { Router } from "express";
import { TutorController } from "../controllers/TutorController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const tutorController = new TutorController();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get("/recommendations", tutorController.getDailyRecommendations);
router.post("/activity", tutorController.logActivity);
router.get("/history", tutorController.getActivityHistory);

export default router;
