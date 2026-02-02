import bcrypt from "bcrypt";
import { createAdmin, findByAdminUsername, getAdmins } from "../model/admin.js";
import { generateToken } from "../config/jwsUtils.js";

export const signUpAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await createAdmin({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await findByAdminUsername(username);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Wrong Password" });

    const token = generateToken({
      id: admin.id,
      username: admin.username,
      role: "admin",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchAdmins = async (req, res) => {
  try {
    const admins = await getAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
