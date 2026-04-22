import express from "express";
import {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadCourseCover
} from "../controller/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Public
router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);

// Admin CRUD (protected)
router.post("/", protect, createCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

// Cover image upload (protected)
router.post("/upload/cover", protect, upload.single("file"), uploadCourseCover);

export default router;
