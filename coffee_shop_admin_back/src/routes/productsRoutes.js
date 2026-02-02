import express from "express";
import {
  addProduct,
  deleteProducts,
  fetchAllProducts,
  updateProducts,
} from "../controller/productController.js";
import upload from "../middleware/upload.js";
const router = express.Router();
router.get("/product", fetchAllProducts);
router.put("/product/:id", updateProducts);
router.post("/product", upload.single("image"), addProduct);
router.delete("/product/:id", deleteProducts);

export default router;
