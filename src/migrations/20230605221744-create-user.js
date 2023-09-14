"use strict";

// Import the required modules using CommonJS syntax
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

// Define the migration functions using CommonJS syntax
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      rol: {
        type: DataTypes.TINYINT,
      },
      phone: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      companyId: {
        type: DataTypes.UUID,
        references: {
          model: "Company",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("User");
  },
};
