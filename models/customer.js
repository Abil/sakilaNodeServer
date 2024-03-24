import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../utils/db.js";
import { Address } from "./address.js";
import { Store } from "./staffxstore.js";

// Define a model
const Customer = sequelize.define(
  "customer",
  {
    customer_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    store_id: {
      type: DataTypes.TINYINT.UNSIGNED,
    },

    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      //unique: true,  //Hanled in options below
      allowNull: true,
    },
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true, // Disable table pluralization
    timestamps: false, // Assuming the timestamps are managed by MySQL itself
    indexes: [{ unique: true, fields: ["email"] }], //To prevent sequelizefrom creting multiple indexes
  }
);

// Address Association with Customer
Customer.belongsTo(Address, {
  foreignKey: "address_id",
  onDelete: "SET NULL", // Set address_id to NULL if associated address is deleted
  onUpdate: "CASCADE", // TODO: Are onUpdate cascades even necessary as primaryKey may never change?
});

// Store Association with Customer
Customer.belongsTo(Store, {
  foreignKey: "store_id",
  onDelete: "SET NULL", // Set store_id to NULL if associated address is deleted
  onUpdate: "CASCADE",
});

//module.exports = Customer;
export default Customer;
