"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar la columna "proveedores"
    await queryInterface.addColumn("Users", "proveedores", {
      type: Sequelize.UUID,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la columna "proveedores"
    await queryInterface.removeColumn("Users", "proveedores");
  },
};
