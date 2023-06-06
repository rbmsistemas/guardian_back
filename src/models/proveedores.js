"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proveedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Proveedores.init(
    {
      proveedor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      encargado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "El email debe ser un correo válido" },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Proveedores",
    }
  );
  return Proveedores;
};
