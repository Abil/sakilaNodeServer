import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Country model
const Country = sequelize.define(
  "country",
  {
    country_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "country",
    timestamps: false,
  }
);

//Exports
export default Country;
