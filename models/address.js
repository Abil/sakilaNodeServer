import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

//import City from "./city.js";

// Define the Language model
const Address = sequelize.define(
  "address",
  {
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    city_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    phone: {
      type: DataTypes.STRING(20),
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
    tableName: "address",
    timestamps: false,
  }
);

/*Associations*/
//Every address entry has only one city entry associated (one to one)
// Address.belongsTo(City, { foreignKey: "city_id" });

//Exports
export default Address;
