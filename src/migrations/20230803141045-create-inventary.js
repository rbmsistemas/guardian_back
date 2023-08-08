"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
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
    },
    activo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    images: {
      type: Sequelize.JSON,
      allowNull: false,
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Inventaries");
}
