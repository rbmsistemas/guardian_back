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
    await queryInterface.bulkInsert(
      "User",
      [
        {
          id: uuid.v4(),
          firstName: "Miguel Angel",
          lastName: "Magaña Ortiz",
          email: "mmagana@aeropuertosgap.com.mx",
          phone: "3221821239",
          password: await encryptPassword("mmagana"),
          userName: "mmagana",
          rol: 2,
          photo: "",
          companyId: "00000000-0000-0000-0000-000000000000",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
