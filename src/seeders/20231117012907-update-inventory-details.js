"use strict";

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultDetails = [
      { key: "orden de compra", value: "" },
      { key: "factura", value: "" },
      { key: "ubicacion", value: "" },
      { key: "usuario", value: "" },
    ];

    // Actualizar los registros existentes en la tabla 'inventory' con el valor predeterminado para 'details'
    await queryInterface.bulkUpdate(
      "Inventory",
      { details: JSON.stringify(defaultDetails) },
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
