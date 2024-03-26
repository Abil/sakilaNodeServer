import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Language model
const FilmCategory = sequelize.define(
  "film_category",
  {
    film_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
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
    tableName: "film_category",
    timestamps: false,
  }
);

//Exports
export default FilmCategory;
