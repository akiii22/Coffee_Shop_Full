import express from "express";
import {
  fetchOrderItems,
  fetchOrders,
  updateOrder,
} from "../controller/orderController.js";

const router = express.Router();

router.get("/orders", fetchOrders);
router.get("/orders/:orderId/items", fetchOrderItems);
router.put("/orders/:orderId", updateOrder);

export default router;
