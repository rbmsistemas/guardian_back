"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "InventaryTypes",
      [
        {
          name: "Computadora",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Teléfono",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Impresora",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Monitor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Teclado",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mouse",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pantalla",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "UPS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Router",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Switch",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Access Point",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Servidor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("InventaryTypes", null, {});
  },
};
