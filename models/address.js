import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Address model
const Address = sequelize.define(
  "address",
  {
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    city_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "address",
    timestamps: false,
  }
);

//Exports
export default Address;
