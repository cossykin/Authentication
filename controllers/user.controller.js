// controllers/user.controller.js
export const getDashboard = (req, res) => {
  res.status(200).json({ message: "Welcome to your dashboard!", userId: req.userId });
};
