import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Store model
const Store = sequelize.define(
  "store",
  {
    store_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    manager_staff_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "store",
    timestamps: false,
  }
);

//Exports
export default Store;
