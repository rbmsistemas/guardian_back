import Sequelize from "sequelize";
import { sequelize } from "../db/connection.js";
import User from "./user.js";
import Proveedores from "./proveedores.js";

let models = {};

try {
  models.User = User(sequelize, Sequelize.DataTypes);
  models.Proveedores = Proveedores(sequelize, Sequelize.DataTypes);

  models.User.associate(models);
  models.Proveedores.associate(models);
} catch (error) {
  console.log(error);
}

export default models;
