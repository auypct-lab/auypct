import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    tag: { type: String, default: "" },           // e.g. "Technology", "Arts"
    shortDesc: { type: String, default: "" },      // card summary text

    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },

    // Course-specific metadata
    duration: { type: String, default: "" },       // e.g. "3 Months"
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid", ""],
      default: ""
    },
    fee: { type: String, default: "Free" },        // e.g. "Free" or "₹500"

    // Blog-like content sections
    sections: [
      {
        heading: { type: String, default: "" },
        text: { type: String, default: "" }
      }
    ],

    // Images
    coverImage: { type: String, default: "" },
    gallery: [{ type: String }],

    isVerified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
