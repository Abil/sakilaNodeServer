import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Language model
const Language = sequelize.define(
  "language",
  {
    language_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "language",
    timestamps: false,
  }
);

//Exports
export default Language;
