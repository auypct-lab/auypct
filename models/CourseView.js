import mongoose from "mongoose";

const courseViewSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("CourseView", courseViewSchema);
