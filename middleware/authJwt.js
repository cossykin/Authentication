// middleware/authJwt.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "No token provided!" });

  if (token.startsWith("Bearer ")) token = token.slice(7);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized!" });

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};
