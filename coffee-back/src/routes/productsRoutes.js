import express from "express";
import { fetchAllProducts } from "../controller/productsController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/product", authenticate, fetchAllProducts);

export default router;
