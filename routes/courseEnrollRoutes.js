import express from "express";
import CourseEnroll from "../models/CourseEnroll.js";

const router = express.Router();
const GLOBAL_KEY = "__courses__";

// GET /api/course-enrolls?slug=xxx  — fetch enroll count
router.get("/", async (req, res) => {
  try {
    const key = req.query.slug || GLOBAL_KEY;
    const doc = await CourseEnroll.findOne({ slug: key });
    res.json({ slug: key, enrolls: doc ? doc.enrolls : 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/course-enrolls  — increment { slug }
router.post("/", async (req, res) => {
  try {
    const key = req.body?.slug || GLOBAL_KEY;

    // Upsert the slug enroll count
    const doc = await CourseEnroll.findOneAndUpdate(
      { slug: key },
      { $inc: { enrolls: 1 } },
      { upsert: true, new: true }
    );

    // Also bump global counter (if not already the global key)
    if (key !== GLOBAL_KEY) {
      await CourseEnroll.findOneAndUpdate(
        { slug: GLOBAL_KEY },
        { $inc: { enrolls: 1 } },
        { upsert: true, new: true }
      );
    }

    res.json({ slug: key, enrolls: doc.enrolls });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
