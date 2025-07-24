// utils/otpGenerator.js

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const otpExpiryMinutes = 10; // Can adjust as needed
