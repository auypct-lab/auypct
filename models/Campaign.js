import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: ["Education", "Medical", "EPS", "Self Empowerment", "Grocery", "Disaster"],
      required: true
    },

    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    beneficiariesCount: { type: Number, default: 0 },

    isVerified: { type: Boolean, default: true },

    status: { type: String, enum: ["Active", "Paused", "Completed"], default: "Active" }
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", CampaignSchema);

