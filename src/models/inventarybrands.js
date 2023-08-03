"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class InventaryBrands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InventaryBrands.belongsTo(models.InventaryTypes, {
        foreignKey: "inventaryTypeId",
        as: "inventaryType",
      });
      InventaryBrands.hasMany(models.Inventary, {
        foreignKey: "inventaryBrandId",
        as: "inventary",
      });
    }
  }
  InventaryBrands.init(
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
      inventaryTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "InventaryTypes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "InventaryBrands",
    }
  );
  return InventaryBrands;
};
