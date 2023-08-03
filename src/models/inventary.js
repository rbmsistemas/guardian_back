"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Inventary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventary.belongsTo(models.InventaryTypes, {
        foreignKey: "inventaryTypeId",
        as: "inventaryType",
      });
      Inventary.belongsTo(models.InventaryBrands, {
        foreignKey: "inventaryBrandId",
        as: "inventaryBrand",
      });
      Inventary.belongsTo(models.InventaryModels, {
        foreignKey: "inventaryModelId",
        as: "inventaryModel",
      });
    }
  }
  Inventary.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      inventaryTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "InventaryTypes",
          key: "id",
        },
      },
      inventaryBrandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "InventaryBrands",
          key: "id",
        },
      },
      inventaryModelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "InventaryModels",
          key: "id",
        },
      },
      serialNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Inventary",
    }
  );
  return Inventary;
};
