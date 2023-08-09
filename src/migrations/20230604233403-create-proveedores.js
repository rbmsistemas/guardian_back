"use strict";

// Import the required modules using CommonJS syntax
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

// Define the migration functions using CommonJS syntax
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Proveedores", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID, // Use DataTypes instead of Sequelize
      },
      proveedor: {
        type: DataTypes.STRING,
      },
      encargado: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      comments: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Proveedores");
  },
};
