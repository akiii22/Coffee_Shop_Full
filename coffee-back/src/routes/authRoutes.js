import express from "express";
import { loginUser, signUpUser } from "../controller/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/loginAuth", loginUser);

router.get("/dashboard", authenticate, (req, res) => {
  res.status(200).json({ message: "Welcome to the dashboard", user: req.user });
});

export default router;
