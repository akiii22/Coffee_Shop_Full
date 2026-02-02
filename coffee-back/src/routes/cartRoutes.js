import express from "express";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
} from "../controller/cartController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, addToCart);
router.get("/", authenticate, fetchCartItems);
router.delete("/:cart_id", authenticate, removeFromCart);

export default router;
