import express from "express";
import {
  getEvents,
  createEvents,
  joinEvents,
  addCommitteeMember,
  removeCommitteeMember,
  getCommittee,
  getOwnCommitteeRequest,
  getAllRequests,
  handleRequest,
  requestToJoinCommittee,
  updateFundingStatus,
  getEventById
} from "../controllers/eventControllers";

import { getUserByUID, getUserProfile } from "../controllers/userControllers";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

// Event routes
router.get("/", getEvents);
router.post("/", authenticate, createEvents);
router.get("/:id", authenticate, getEventById);
router.post("/:id/join", authenticate, joinEvents);

// Committee routes
router.post("/:eventId/committee", authenticate, addCommitteeMember);
router.delete("/:eventId/committee/:uid", authenticate, removeCommitteeMember);
router.get("/:eventId/committee", getCommittee);

// Committee request routes
router.post("/:eventId/committee/request", authenticate, requestToJoinCommittee);
router.get("/:eventId/committee/request/:uid", authenticate, getOwnCommitteeRequest);
router.get("/:eventId/committee/requests", authenticate, getAllRequests);
router.post("/:eventId/committee/handle", authenticate, handleRequest);

// User routes
router.get("/user/:uid", getUserByUID);
router.get("/profile/:uid", authenticate, getUserProfile);

// Funding Status update route
router.patch("/:eventId/funding-status", authenticate, updateFundingStatus);

export default router;
