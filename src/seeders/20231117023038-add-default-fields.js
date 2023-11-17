"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const defaultFields = [
      { name: "orden de compra", createdAt: new Date(), updatedAt: new Date() },
      { name: "factura", createdAt: new Date(), updatedAt: new Date() },
      { name: "ubicacion", createdAt: new Date(), updatedAt: new Date() },
      { name: "usuario", createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert("InventoryField", defaultFields, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("InventoryField", null, {});
  },
};
