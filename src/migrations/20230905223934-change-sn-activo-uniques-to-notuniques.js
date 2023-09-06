"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.sequelize.query(
    //   "ALTER TABLE Inventaries DROP CONSTRAINT serialNumber"
    // );
    await queryInterface.sequelize.query(
      "ALTER TABLE Inventaries DROP CONSTRAINT activo"
    );
    await queryInterface.changeColumn("Inventaries", "serialNumber", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    });

    await queryInterface.changeColumn("Inventaries", "activo", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Inventaries", "serialNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.changeColumn("Inventaries", "activo", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
