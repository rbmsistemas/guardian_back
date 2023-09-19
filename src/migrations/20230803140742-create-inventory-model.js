"use strict";

// Import the required modules using CommonJS syntax
const Sequelize = require("sequelize");

// Define the migration functions using CommonJS syntax
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("InventoryModel", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      inventoryBrandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "InventoryBrand",
          key: "id",
        },
      },
      inventoryTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "InventoryType",
          key: "id",
        },
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
    await queryInterface.dropTable("InventoryModel");
  },
};
