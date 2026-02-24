import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },

    type: {
      type: String,
      enum: ["DonationReceived", "Expense", "Milestone", "Document"],
      required: true
    },

    title: { type: String, required: true },
    amount: { type: Number, default: 0 },

    verified: { type: Boolean, default: false },

    documentUrl: { type: String, default: "" },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Audit", AuditSchema);

