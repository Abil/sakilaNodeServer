import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Advisor model
const Advisor = sequelize.define(
  "advisor",
  {
    advisor_id: {
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
    is_chairmain: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "advisor",
    timestamps: false,
  }
);

//Exports
export default Advisor;
