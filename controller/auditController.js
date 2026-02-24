import Audit from "../models/Audit.js";

export const createAudit = async (req, res, next) => {
  try {
    const audit = await Audit.create(req.body);
    res.status(201).json(audit);
  } catch (err) {
    next(err);
  }
};

export const getAuditByCampaign = async (req, res, next) => {
  try {
    const logs = await Audit.find({ campaignId: req.params.campaignId }).sort({
      createdAt: -1,
    });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};
