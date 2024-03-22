import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../utils/db.js";

// Define a model
const Customer = sequelize.define(
  "customer",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, // Disable table pluralization
    timestamps: false,
  }
);

//module.exports = Customer;
export default Customer;
