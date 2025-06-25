import express from "express";
import { 
    updateUserProfile, 
    createOrUpdateUser, 
    getUserByUID, 
    getUserProfile 
} from "../controllers/userControllers";

const router = express.Router();
router.post("/", createOrUpdateUser);
router.get("/:uid", getUserByUID);
router.get("/profile/:uid", getUserProfile);
router.put("/profile/:uid", updateUserProfile) // Assuming this is for fetching user profile by UID
export default router;