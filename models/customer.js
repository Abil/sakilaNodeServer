import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Store model
const Customer = sequelize.define(
  "customer",
  {
    customer_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    store_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    create_date: {
      type: DataTypes.DATE,
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
    tableName: "customer",
    timestamps: false,
  }
);

//Exports
export default Customer;
