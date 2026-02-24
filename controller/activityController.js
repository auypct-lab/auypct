import Activity from "../models/Activity.js";

// Public
export const getActivities = async (req, res) => {
  const list = await Activity.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getActivityBySlug = async (req, res) => {
  const item = await Activity.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: "Activity not found" });
  res.json(item);
};

// Admin
export const createActivity = async (req, res) => {
  const created = await Activity.create(req.body);
  res.status(201).json(created);
};

export const updateActivity = async (req, res) => {
  const item = await Activity.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Activity not found" });

  Object.assign(item, req.body);
  const saved = await item.save();
  res.json(saved);
};

export const deleteActivity = async (req, res) => {
  const item = await Activity.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Activity not found" });

  await item.deleteOne();
  res.json({ message: "Deleted" });
};

// Upload cover image (Admin)
export const uploadCover = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ url: `/uploads/${req.file.filename}` });
};