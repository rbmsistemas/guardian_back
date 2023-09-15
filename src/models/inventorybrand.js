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
      InventoryBrand.hasMany(models.InventoryModel, {
        foreignKey: "inventoryBrandId",
        as: "inventoryBrand",
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
