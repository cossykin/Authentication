// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import sendOtpEmail from "../utils/mailer.js";
import { generateOTP, otpExpiryMinutes } from "../utils/otpGenerator.js";

const User = db.User;
const OTP = db.OTP;

export const signup = async (req, res) => {
  console.log("Signup body:", req.body);

  try {
    const { username, email, password } = req.body;
    
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ username, email, password: hashedPassword });

    // Generate and store OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + otpExpiryMinutes * 60000);
    await OTP.create({ code: otp, expiresAt, userId: user.id });

    await sendOtpEmail(email, otp);
    return res.status(201).json({ message: "Signup successful. Check your email for OTP." });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Signup error", error: err.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "User not found" });

    if (!user.isVerified) return res.status(403).json({ message: "Email not verified" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    
    // Save user info in session
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.roles = user.roles || ['user'];

    res.status(200).json({
      message: "Login successful",
      accessToken: token,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });

    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};
