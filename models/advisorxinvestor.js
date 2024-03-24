import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

//Advisor Model
const Advisor = sequelize.define(
  "advisor",
  {
    advisor_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    is_chairman: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0, // Assuming 0 represents false and 1 represents true
    },
  },
  {
    tableName: "advisor",
    timestamps: false,
  }
);

//Investor Model
const Investor = sequelize.define(
  "investor",
  {
    investor_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
export { Advisor, Investor };
