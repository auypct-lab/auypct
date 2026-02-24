import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },

    donorName: { type: String, required: true, trim: true },
    donorPhone: { type: String, default: "" },

    amount: { type: Number, required: true },

    paymentStatus: { type: String, enum: ["Success", "Pending", "Failed"], default: "Success" }
  },
  { timestamps: true }
);

export default mongoose.model("Donation", DonationSchema);

