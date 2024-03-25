import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

//import City from "./city.js";

// Define the Country model
const Country = sequelize.define(
  "country",
  {
    country_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(50),
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
    tableName: "country",
    timestamps: false,
  }
);

/*Associations*/

//A country entry can be associated with multiple city entries (one to many)
// Country.hasMany(City, { foreignKey: "country_id" });

//Exports
export default Country;
