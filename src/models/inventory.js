"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.InventoryModel, {
        foreignKey: "inventoryModelId",
        as: "inventoryModel",
      });
      Inventory.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Inventory.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      inventoryModelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "InventoryModel",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      serialNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      activo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      altaDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      bajaDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      recepcionDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Inventory",
      tableName: "Inventory",
    }
  );
  return Inventory;
};
