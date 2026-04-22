import Course from "../models/Course.js";

// ── Public ────────────────────────────────────────────────────────────────────

export const getCourses = async (req, res) => {
  const list = await Course.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getCourseBySlug = async (req, res) => {
  const item = await Course.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: "Course not found" });
  res.json(item);
};

// ── Admin (protected) ─────────────────────────────────────────────────────────

export const createCourse = async (req, res) => {
  const created = await Course.create(req.body);
  res.status(201).json(created);
};

export const updateCourse = async (req, res) => {
  const item = await Course.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Course not found" });

  Object.assign(item, req.body);
  const saved = await item.save();
  res.json(saved);
};

export const deleteCourse = async (req, res) => {
  const item = await Course.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Course not found" });

  await item.deleteOne();
  res.json({ message: "Deleted" });
};

// ── Cover upload (Admin) ──────────────────────────────────────────────────────

export const uploadCourseCover = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ url: `/uploads/${req.file.filename}` });
};
