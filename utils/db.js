import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mavenmovies", "root", "ellipsis8", {
  host: "localhost",
  dialect: "mysql",
});

//module.exports.default = sequelize;
export default sequelize;
