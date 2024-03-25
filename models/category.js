import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Category model
const Category = sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(25),
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
    tableName: "category",
    timestamps: false,
  }
);

//Exports
export default Category;
