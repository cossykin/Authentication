// routes/user.routes.js
import express from "express";
import { getDashboard } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getDashboard);

export default router;
