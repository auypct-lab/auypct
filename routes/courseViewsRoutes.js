import express from "express";
import CourseView from "../models/CourseView.js";

const router = express.Router();
const GLOBAL_KEY = "__courses__";

// GET /api/course-views?slug=xxx  — fetch count for a slug (or global)
router.get("/", async (req, res) => {
  try {
    const key = req.query.slug || GLOBAL_KEY;
    const doc = await CourseView.findOne({ slug: key });
    res.json({ slug: key, views: doc ? doc.views : 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/course-views  — increment { slug } or global
router.post("/", async (req, res) => {
  try {
    const key = req.body?.slug || GLOBAL_KEY;

    // Upsert the slug view count
    const doc = await CourseView.findOneAndUpdate(
      { slug: key },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );

    // Also bump global counter (if not already the global key)
    if (key !== GLOBAL_KEY) {
      await CourseView.findOneAndUpdate(
        { slug: GLOBAL_KEY },
        { $inc: { views: 1 } },
        { upsert: true, new: true }
      );
    }

    res.json({ slug: key, views: doc.views });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
