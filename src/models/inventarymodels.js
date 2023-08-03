"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class InventaryModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InventaryModels.belongsTo(models.InventaryTypes, {
        foreignKey: "inventaryTypeId",
        as: "inventaryType",
      });
      InventaryModels.hasMany(models.Inventary, {
        foreignKey: "inventaryModelId",
        as: "inventary",
      });
    }
  }
  InventaryModels.init(
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
      modelName: "InventaryModels",
    }
  );
  return InventaryModels;
};
