import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Define the City model
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
      references: {
        model: Country,
        key: "country_id",
      },
      // onUpdate: "CASCADE",  //TODO: This maybe redundant so need to remove
      // onDelete: "RESTRICT",
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Define foreign key constraint explicitly
City.belongsTo(Country, {
  foreignKey: "country_id",
  targetKey: "country_id",
  onDelete: "RESTRICT", // TODO: I think this must be changed to CASCADE
  onUpdate: "CASCADE",
});

// Define the Address model
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
      references: {
        model: City,
        key: "city_id",
      },
      // onUpdate: "CASCADE",
      // onDelete: "RESTRICT", // TODO: This may be redundant so need to remove
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Define foreign key constraint explicitly
Address.belongsTo(City, {
  foreignKey: "city_id",
  targetKey: "city_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

//Exports
export { Country, City, Address };
