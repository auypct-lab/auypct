import express from "express";
import { getTransparencyStats } from "../controller/statsController.js";

const router = express.Router();
router.get("/transparency", getTransparencyStats);
export default router;
