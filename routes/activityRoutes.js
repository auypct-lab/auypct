import express from "express";
import {
  getActivities,
  getActivityBySlug,
  createActivity,
  updateActivity,
  deleteActivity,
  uploadCover
} from "../controller/activityController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getActivities);
router.get("/:slug", getActivityBySlug);

// Admin CRUD
router.post("/", protect, createActivity);
router.put("/:id", protect, updateActivity);
router.delete("/:id", protect, deleteActivity);

// Upload cover
router.post("/upload/cover", protect, upload.single("file"), uploadCover);

export default router;