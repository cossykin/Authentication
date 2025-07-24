// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import db from "./models/index.js";

import sessionMiddleware from './config/session.config.js';
// Routes
import authRoutes from "./routes/auth.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import userRoutes from "./routes/user.routes.js";

import protectedRoutes from './routes/protected.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: "http://localhost:8080" })); // adjust for frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// Static frontend (optional if you have public/auth.html etc.)
app.use(express.static("public"));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/user", userRoutes);

app.use('/api', protectedRoutes);

// app.use('/api/protected', sessionAuth, protectedRoutes);


// Root route
// app.get("/", (req, res) => {
//   res.send("User Auth API is running.");
// });
app.get("/", (req, res) => {
  res.sendFile("auth.html", { root: "public" });
});

app.get('/session-test', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome to the session demo. Refresh!');
  }
});


// Sync DB and start server
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
