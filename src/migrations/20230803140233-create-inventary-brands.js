"use strict";

// Import the required modules using CommonJS syntax
const Sequelize = require("sequelize");

// Define the migration functions using CommonJS syntax
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("InventaryBrands", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      inventaryTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "InventaryTypes",
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
    await queryInterface.dropTable("InventaryBrands");
  },
};
