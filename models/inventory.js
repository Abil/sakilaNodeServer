import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Investor model
const Inventory = sequelize.define(
  "inventory",
  {
    inventory_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    film_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.TINYINT.UNSIGNED,
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
    tableName: "inventory",
    timestamps: false,
  }
);

//Exports
export default Inventory;
