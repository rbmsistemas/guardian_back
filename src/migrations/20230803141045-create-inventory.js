"use strict";

// Import the required modules using CommonJS syntax
const Sequelize = require("sequelize");

// Define the migration functions using CommonJS syntax
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Inventory", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      inventoryModelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "InventoryModel",
          key: "id",
        },
      },
      serialNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      activo: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      altaDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      bajaDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      recepcionDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Inventory");
  },
};
