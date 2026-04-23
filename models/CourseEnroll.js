import mongoose from "mongoose";

const courseEnrollSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    enrolls: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("CourseEnroll", courseEnrollSchema);
