import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../utils/db.js";
import { Address } from "./address.js";

// Define the Staff model
const Staff = sequelize.define(
  "staff",
  {
    staff_id: {
      type: DataTypes.TINYINT.UNSIGNED,
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
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    picture: DataTypes.BLOB,
    email: DataTypes.STRING(50),
    store_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "staff",
    timestamps: false,
  }
);

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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "store",
    timestamps: false,
  }
);

// Define associations
Staff.belongsTo(Address, { foreignKey: "address_id" });
Staff.belongsTo(Store, { foreignKey: "store_id" }); //TODO: If sotre is deleted, staff can be deleted (onDelete: 'CASCADE')
Store.belongsTo(Address, { foreignKey: "address_id" });
Store.belongsTo(Staff, { foreignKey: "manager_staff_id" }); //TODO: If satff is deleted, store need not be deleted (onDelete: 'SET NULL')

export { Staff, Store };
