import Donation from "../models/Donation.js";
import Campaign from "../models/Campaign.js";
import Audit from "../models/Audit.js";

export const createDonation = async (req, res, next) => {
  try {
    const donation = await Donation.create(req.body);

    // update campaign raised amount
    await Campaign.findByIdAndUpdate(donation.campaignId, {
      $inc: { raisedAmount: donation.amount }
    });

    // add audit log for live trail
    await Audit.create({
      campaignId: donation.campaignId,
      type: "DonationReceived",
      title: `Donation received from ${donation.donorName}`,
      amount: donation.amount,
      verified: true,
      notes: "Donation recorded successfully."
    });

    res.status(201).json(donation);
  } catch (err) {
    next(err);
  }
};

export const getDonationsByCampaign = async (req, res, next) => {
  try {
    const donations = await Donation.find({ campaignId: req.params.campaignId }).sort({
      createdAt: -1
    });
    res.json(donations);
  } catch (err) {
    next(err);
  }
};

