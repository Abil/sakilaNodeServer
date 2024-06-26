import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  "mavenmovies",
  "root",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Disable logging
  }
);

//module.exports.default = sequelize;
export default sequelize;
