import Campaign from "../models/Campaign.js";

export const createCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    next(err);
  }
};

export const getCampaigns = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    next(err);
  }
};

export const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (err) {
    next(err);
  }
};

