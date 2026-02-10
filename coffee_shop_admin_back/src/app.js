import express from "express";
import cors from "cors";

import productsRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashBoardRoutes from "./routes/dashBoardRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

const app = express();

const allowedOrigins = [
  "https://coffee-shop-admin-phi.vercel.app",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
