import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const signToken = (admin) =>
  jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists) return res.status(400).json({ message: "Admin already exists" });

  const admin = await Admin.create({ name, email, password });

  res.json({
    token: signToken(admin),
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await admin.matchPassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: signToken(admin),
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
};