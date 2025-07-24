// utils/mailer.js

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Or use SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const sendOtpEmail = async (toEmail, otpCode) => {
  const mailOptions = {
    from: `"Auth System" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otpCode}. It expires in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to:", toEmail);
  } catch (err) {
    console.error("Error sending OTP email:", err.message);
    throw err;
  }
};

export default sendOtpEmail;
