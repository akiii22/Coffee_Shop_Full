import express from "express";
import {
  signUpAdmin,
  loginAdmin,
  fetchAdmins,
} from "../controller/authController.js";

const router = express.Router();

router.get("/admins", fetchAdmins);
router.post("/signup", signUpAdmin);
router.post("/login", loginAdmin);

export default router;
