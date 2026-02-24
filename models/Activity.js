import mongoose from "mongoose";

const yearRowSchema = new mongoose.Schema(
  {
    year: { type: String, required: true }, // "2018-2019"
    amount: { type: Number, default: 0 },
    beneficiaries: { type: Number, default: 0 }
  },
  { _id: false }
);

const activitySchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    tag: { type: String, default: "" }, // Education/Medical...
    shortDesc: { type: String, default: "" }, // card text
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },

    // Blog-like content
    sections: [
      {
        heading: { type: String, default: "" },
        text: { type: String, default: "" }
      }
    ],

    // Images (stored as URLs like "/uploads/abc.jpg")
    coverImage: { type: String, default: "" },
    gallery: [{ type: String }],

    // Year-wise report
    yearWise: [yearRowSchema],

    isVerified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);