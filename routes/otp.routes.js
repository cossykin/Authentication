// routes/otp.routes.js
import express from "express";
import { verifyOtpController } from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/verify", verifyOtpController);

export default router;
