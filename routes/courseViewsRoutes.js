import express from "express";

const router = express.Router();

// In-memory store: { slug: count }
const viewStore = {};
const GLOBAL_KEY = "__courses__";

// GET /api/course-views?slug=xxx  — fetch count for a slug (or global)
router.get("/", (req, res) => {
  const key = req.query.slug || GLOBAL_KEY;
  res.json({ slug: key, views: viewStore[key] || 0 });
});

// POST /api/course-views  — increment { slug } or global
router.post("/", (req, res) => {
  const key = req.body?.slug || GLOBAL_KEY;
  viewStore[key] = (viewStore[key] || 0) + 1;
  // Also bump global courses counter
  if (key !== GLOBAL_KEY) {
    viewStore[GLOBAL_KEY] = (viewStore[GLOBAL_KEY] || 0) + 1;
  }
  res.json({ slug: key, views: viewStore[key] });
});

export default router;
