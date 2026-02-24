import Campaign from "../models/Campaign.js";
import Audit from "../models/Audit.js";

export const getTransparencyStats = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({});
    const totals = campaigns.reduce(
      (acc, c) => {
        acc.goal += Number(c.goalAmount || 0);
        acc.raised += Number(c.raisedAmount || 0);
        acc.beneficiaries += Number(c.beneficiariesCount || 0);
        return acc;
      },
      { goal: 0, raised: 0, beneficiaries: 0 }
    );

    const allocatedPercent =
      totals.goal > 0 ? Math.min(100, Math.round((totals.raised / totals.goal) * 100)) : 0;

    const latestAudits = await Audit.find({}).sort({ createdAt: -1 }).limit(5);

    res.json({ totals, allocatedPercent, latestAudits });
  } catch (err) {
    next(err);
  }
};
