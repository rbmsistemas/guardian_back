import Sequelize from "sequelize";
import { sequelize } from "../db/connection.js";
import User from "./user.js";

let models = {};

try {
  models.User = User(sequelize, Sequelize.DataTypes);

  models.User.associate(models);
} catch (error) {
  console.log(error);
}

export default models;
