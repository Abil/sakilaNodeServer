import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Actor model
const Actor = sequelize.define(
  "actor",
  {
    actor_id: {
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
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "actor",
    timestamps: false,
  }
);

//Exports
export default Actor;
