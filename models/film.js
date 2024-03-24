import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../utils/db.js";
import { Language } from "./categoryxlanguage.js";

const Film = sequelize.define(
  "film",
  {
    film_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    release_year: {
      //type: DataTypes.YEAR, //It threw error saying there is no YEAR type (probably does not exist)
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    language_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    original_language_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
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
      allowNull: true,
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
      //type: DataTypes.JSON, //Seems to throw a error for this
      // type: DataTypes.ENUM( //Throwing data truncated error for some reason, (TODO: Handle separately)
      //   "Trailers",
      //   "Commentaries",
      //   "Deleted Scenes",
      //   "Behind the Scenes"
      // ),
      type: DataTypes.STRING,
      allowNull: true,
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

// Define association with Language model
Film.belongsTo(Language, { foreignKey: "language_id" });
Film.belongsTo(Language, {
  foreignKey: "original_language_id",
});

export default Film;
