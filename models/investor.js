import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Investor model
const Investor = sequelize.define(
  "investor",
  {
    investor_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
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
    company_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    tableName: "investor",
    timestamps: false,
  }
);

//Exports
export default Investor;
