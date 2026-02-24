import express from "express";
import { createAudit, getAuditByCampaign } from "../controller/auditController.js";

const router = express.Router();

router.post("/", createAudit);
router.get("/campaign/:campaignId", getAuditByCampaign);

export default router;
