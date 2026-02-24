import express from "express";
import { createDonation, getDonationsByCampaign } from "../controller/donationController.js";

const router = express.Router();

router.post("/", createDonation);
router.get("/campaign/:campaignId", getDonationsByCampaign);

export default router;
