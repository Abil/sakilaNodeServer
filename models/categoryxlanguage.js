import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

//Category Model

const Category = sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

//Language Model
const Language = sequelize.define(
  "language",
  {
    language_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "language",
    timestamps: false,
  }
);

//Exports
export { Category, Language };
