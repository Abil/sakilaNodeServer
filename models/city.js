import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// import Country from "./country.js";
// import Address from "./address.js";

// Define the Language model
const City = sequelize.define(
  "city",
  {
    city_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
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
    tableName: "city",
    timestamps: false,
  }
);

/*Associations*/

//A city entry can be associated with multiple address entries (one to many)
//City.hasMany(Address, { foreignKey: "city_id" });
//Every city entry has only one country entry associated (one to one)
//City.belongsTo(Country, { foreignKey: "country_id" });

//Exports
export default City;
