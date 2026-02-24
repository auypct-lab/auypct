import express from "express";
import { createCampaign, getCampaigns, getCampaignById } from "../controller/campaignController.js";

const router = express.Router();

router.get("/", getCampaigns);
router.post("/", createCampaign);
router.get("/:id", getCampaignById);

export default router;
