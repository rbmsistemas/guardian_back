import Sequelize from "sequelize";
import { sequelize } from "../db/connection.js";
import User from "./user.js";
import Company from "./company.js";
import Inventory from "./inventory.js";
import InventoryBrand from "./inventorybrand.js";
import InventoryModel from "./inventorymodel.js";
import InventoryType from "./inventorytype.js";
import InventoryField from "./inventoryfield.js";

let models = {};

try {
  models.User = User(sequelize, Sequelize.DataTypes);
  models.Company = Company(sequelize, Sequelize.DataTypes);
  models.Inventory = Inventory(sequelize, Sequelize.DataTypes);
  models.InventoryBrand = InventoryBrand(sequelize, Sequelize.DataTypes);
  models.InventoryModel = InventoryModel(sequelize, Sequelize.DataTypes);
  models.InventoryType = InventoryType(sequelize, Sequelize.DataTypes);
  models.InventoryField = InventoryField(sequelize, Sequelize.DataTypes);

  models.User.associate(models);
  models.Company.associate(models);
  models.Inventory.associate(models);
  models.InventoryBrand.associate(models);
  models.InventoryModel.associate(models);
  models.InventoryType.associate(models);
  models.InventoryField.associate(models);
} catch (error) {
  console.log(error);
}

export default models;
