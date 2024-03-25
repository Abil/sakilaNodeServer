import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the City model
const City = sequelize.define(
  "city",
  {
    city_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    tableName: "city",
    timestamps: false,
  }
);

//Exports
export default City;
