import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Language model
const FilmActor = sequelize.define(
  "film_actor",
  {
    actor_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    film_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
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
    tableName: "film_actor",
    timestamps: false,
  }
);

//Exports
export default FilmActor;
