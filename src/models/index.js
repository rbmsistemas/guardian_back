import Sequelize from "sequelize";
import { sequelize } from "../db/connection.js";
import User from "./user.js";
import Proveedores from "./proveedores.js";
import Inventary from "./inventary.js";
import InventaryBrands from "./inventarybrands.js";
import InventaryModels from "./inventarymodels.js";
import InventaryTypes from "./inventarytypes.js";

let models = {};

try {
  models.User = User(sequelize, Sequelize.DataTypes);
  models.Proveedores = Proveedores(sequelize, Sequelize.DataTypes);
  models.Inventary = Inventary(sequelize, Sequelize.DataTypes);
  models.InventaryBrands = InventaryBrands(sequelize, Sequelize.DataTypes);
  models.InventaryModels = InventaryModels(sequelize, Sequelize.DataTypes);
  models.InventaryTypes = InventaryTypes(sequelize, Sequelize.DataTypes);

  models.User.associate(models);
  models.Proveedores.associate(models);
  models.Inventary.associate(models);
  models.InventaryBrands.associate(models);
  models.InventaryModels.associate(models);
  models.InventaryTypes.associate(models);
} catch (error) {
  console.log(error);
}

export default models;
