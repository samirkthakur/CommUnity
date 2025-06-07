import express from "express";
import { getEvents, createEvents, joinEvents } from "../controllers/eventControllers"
import Event from "../models/eventModels.js";
import { getUserByUID, getUserProfile } from "../controllers/userControllers"
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

router.get("/", getEvents)
router.get("/", createEvents)
router.get("/:id/join", joinEvents)
router.post("/:id/join", joinEvents)
router.get("/:uid", getUserByUID)
router.post("/", authenticate, createEvents);
router.post("/:id/join", authenticate, joinEvents);
router.get("/profile/:uid", authenticate, getUserProfile)

export default router