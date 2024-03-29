"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class InventoryModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InventoryModel.belongsTo(models.InventoryType, {
        foreignKey: "inventoryTypeId",
        as: "inventoryType",
      });
      InventoryModel.belongsTo(models.InventoryBrand, {
        foreignKey: "inventoryBrandId",
        as: "inventoryBrand",
      });
      InventoryModel.hasMany(models.Inventory, {
        foreignKey: "inventoryModelId",
        as: "inventoryModel",
      });
    }
  }
  InventoryModel.init(
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
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      inventoryBrandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "InventoryBrand",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      inventoryTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "InventoryType",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "InventoryModel",
      tableName: "InventoryModel",
    }
  );
  return InventoryModel;
};
