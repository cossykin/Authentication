// models/otp.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import User from "./user.model.js";

const OTP = sequelize.define("OTP", {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

User.hasMany(OTP, { foreignKey: "userId", onDelete: "CASCADE" });
OTP.belongsTo(User, { foreignKey: "userId" });

export default OTP;
