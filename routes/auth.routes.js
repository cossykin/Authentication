// routes/auth.routes.js
import express from "express";
import { signup, signin, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.post('/logout', logout);

// In your signin controller function
// const signin = async (req, res) => {
  // After verifying user credentials successfully:

  // Save info in session:
  // req.session.userId = user.id;
  // req.session.username = user.username;
  // req.session.roles = user.roles;

//   res.json({
//     accessToken: generateAccessToken(user), // if you are using JWT too
//     roles: user.roles,
//     message: "Login successful",
//   });
// };


export default router;
