import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Staff model
const Rental = sequelize.define(
  "rental",
  {
    rental_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rental_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    inventory_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    staff_id: {
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
    tableName: "rental",
    timestamps: false,
  }
);

//Exports
export default Rental;
