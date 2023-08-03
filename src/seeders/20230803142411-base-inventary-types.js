"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "InventaryTypes",
      [
        {
          name: "Computadora",
        },
        {
          name: "Teléfono",
        },
        {
          name: "Impresora",
        },
        {
          name: "Monitor",
        },
        {
          name: "Teclado",
        },
        {
          name: "Mouse",
        },
        {
          name: "Pantalla",
        },
        {
          name: "CTS",
        },
        {
          name: "UPS",
        },
        {
          name: "Router",
        },
        {
          name: "Switch",
        },
        {
          name: "Access Point",
        },
        {
          name: "Servidor",
        },
        {
          name: "Otro",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("InventaryTypes", null, {});
  },
};
