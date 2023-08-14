"use strict";

// Import the required modules using CommonJS syntax
const Sequelize = require("sequelize");

// Define the migration functions using CommonJS syntax
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Inventaries", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      inventaryTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "InventaryTypes",
          key: "id",
        },
      },
      inventaryBrandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "InventaryBrands",
          key: "id",
        },
      },
      inventaryModelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "InventaryModels",
          key: "id",
        },
      },
      serialNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      activo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isAsigned: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      altaDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      asignacionDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      bajaDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Inventaries");
  },
};
