// controllers/otp.controller.js
import db from "../models/index.js";

const User = db.User;
const OTP = db.OTP;

export const verifyOtpController = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = await OTP.findOne({
      where: { userId: user.id, code },
      order: [["createdAt", "DESC"]]
    });

    if (!otp) return res.status(400).json({ message: "Invalid OTP" });

    if (new Date() > otp.expiresAt) {
      await otp.destroy();
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    await user.save();
    await otp.destroy();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};
