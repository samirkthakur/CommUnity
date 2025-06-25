import express from "express";
import { createContribution, getContributions } from "../controllers/contributionControllers";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/:eventId/contribute", authenticate, createContribution);
router.get("/:eventId/contributions", getContributions);

export default router;