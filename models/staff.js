import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Staff model
const Staff = sequelize.define(
  "staff",
  {
    staff_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    picture: {
      type: DataTypes.BLOB,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    store_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "staff",
    timestamps: false,
  }
);

//Exports
export default Staff;
