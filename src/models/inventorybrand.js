"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class InventoryBrand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InventoryBrand.hasMany(models.Inventory, {
        foreignKey: "inventoryBrandId",
        as: "inventory",
      });
    }
  }
  InventoryBrand.init(
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
      modelName: "InventoryBrand",
      tableName: "InventoryBrand",
    }
  );
  return InventoryBrand;
};
