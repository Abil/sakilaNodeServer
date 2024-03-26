import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// Define the Staff model
const Payment = sequelize.define(
  "payment",
  {
    payment_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    staff_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    rental_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    amount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
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
    tableName: "payment",
    timestamps: false,
  }
);

//Exports
export default Payment;
