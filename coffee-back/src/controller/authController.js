import bcrypt from "bcrypt";
import { createUser, findByUsername } from "../model/user.js";
import { generateToken } from "../config/jwsUtils.js";

export const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
      role: "customer", // Default role
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findByUsername(username);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Wrong Password" });

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role, // Include role in token
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role, // Include role in response
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
