import express from "express";

import productsRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashBoardRoutes from "./routes/dashBoardRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5174",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashBoardRoutes);
app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => {
  res.send("☕ Coffee Admin Backend is running...");
});

export default app;
