import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Language model
const Film = sequelize.define(
  "film",
  {
    film_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    release_year: {
      //type: DataTypes.YEAR, //There does not seem to be a type like this so using INTEGER instead
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    language_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    original_language_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      defaultValue: null,
    },
    rental_duration: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 3,
    },
    rental_rate: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      defaultValue: 4.99,
    },
    length: {
      type: DataTypes.SMALLINT.UNSIGNED,
      defaultValue: null,
    },
    replacement_cost: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 19.99,
    },
    rating: {
      type: DataTypes.ENUM("G", "PG", "PG-13", "R", "NC-17"),
      defaultValue: "G",
    },
    special_features: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "film",
    timestamps: false,
  }
);

//Exports
export default Film;
