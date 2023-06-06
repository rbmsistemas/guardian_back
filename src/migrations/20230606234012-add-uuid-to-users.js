"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar una nueva columna UUID
    await queryInterface.addColumn("Users", "uuid", {
      type: Sequelize.UUID,
      allowNull: true,
      unique: true,
    });

    // Actualizar registros existentes con UUIDs únicos
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM Users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const user of users) {
      await queryInterface.sequelize.query(
        `UPDATE Users SET uuid = UUID() WHERE id = ${user.id};`
      );
    }

    // Cambiar la columna UUID a no nula (null)
    await queryInterface.changeColumn("Users", "uuid", {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
    });

    // Eliminar la columna ID anterior
    await queryInterface.removeColumn("Users", "id");
  },

  down: async (queryInterface, Sequelize) => {
    // Agregar la columna ID anterior
    await queryInterface.addColumn("Users", "id", {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    });

    // Copiar UUIDs a la columna ID
    const users = await queryInterface.sequelize.query(
      "SELECT uuid FROM Users;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const user of users) {
      await queryInterface.sequelize.query(
        `UPDATE Users SET id = ${user.uuid} WHERE uuid = '${user.uuid}';`
      );
    }

    // Eliminar la columna UUID
    await queryInterface.removeColumn("Users", "uuid");
  },
};
