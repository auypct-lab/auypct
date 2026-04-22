import express from "express";

const router = express.Router();

// In-memory store: { slug: count }
const enrollStore = {};
const GLOBAL_KEY = "__courses__";

// GET /api/course-enrolls?slug=xxx  — fetch enroll count
router.get("/", (req, res) => {
  const key = req.query.slug || GLOBAL_KEY;
  res.json({ slug: key, enrolls: enrollStore[key] || 0 });
});

// POST /api/course-enrolls  — increment { slug }
router.post("/", (req, res) => {
  const key = req.body?.slug || GLOBAL_KEY;
  enrollStore[key] = (enrollStore[key] || 0) + 1;
  if (key !== GLOBAL_KEY) {
    enrollStore[GLOBAL_KEY] = (enrollStore[GLOBAL_KEY] || 0) + 1;
  }
  res.json({ slug: key, enrolls: enrollStore[key] });
});

export default router;
