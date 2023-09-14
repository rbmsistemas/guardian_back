"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class InventoryType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InventoryType.hasMany(models.InventoryBrand, {
        foreignKey: "inventoryTypeId",
        as: "inventoryBrands",
      });
      InventoryType.hasMany(models.Inventory, {
        foreignKey: "inventoryTypeId",
        as: "inventory",
      });
      InventoryType.hasMany(models.InventoryModel, {
        foreignKey: "inventoryTypeId",
        as: "inventoryModel",
      });
    }
  }
  InventoryType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "InventoryType",
      tableName: "InventoryType",
    }
  );
  return InventoryType;
};
