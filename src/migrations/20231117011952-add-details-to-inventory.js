"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Inventory", "details", {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify([
        { key: "orden de compra", value: "" },
        { key: "factura", value: "" },
        { key: "ubicacion", value: "" },
        { key: "usuario", value: "" },
      ]),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Inventory", "details");
  },
};
