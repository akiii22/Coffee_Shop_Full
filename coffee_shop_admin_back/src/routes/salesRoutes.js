import express from "express";
import { getSalesStats } from "../controller/salesController.js";

const router = express.Router();

router.get("/monthly", getSalesStats);

export default router;
