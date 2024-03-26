import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Actor model
const ActorAward = sequelize.define(
  "actor_award",
  {
    actor_award_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    actor_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
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
    awards: {
      type: DataTypes.STRING(45),
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
    tableName: "actor_award",
    timestamps: false,
  }
);

//Exports
export default ActorAward;
