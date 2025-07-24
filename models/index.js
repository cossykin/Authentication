// models/index.js
import sequelize from "../config/db.config.js";
import User from "./user.model.js";
import OTP from "./otp.model.js";

const db = {};

db.sequelize = sequelize;

db.User = User;
db.OTP = OTP;

export default db;
