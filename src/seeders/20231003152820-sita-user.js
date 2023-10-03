"use strict";
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
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
    //  create user
    await queryInterface.bulkInsert(
      "User",
      [
        {
          id: uuid.v4(),
          firstName: "Juan Jose",
          lastName: "Pineda",
          email: "juan.pineda@sita.aero",
          phone: "3221355695",
          password: await encryptPassword("jpineda"),
          userName: "jpineda",
          rol: 3,
          photo: "",
          companyId: "092cd435-dac9-4908-8f4a-b722b1eacd7e",
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
    // delete user with company id 092cd435-dac9-4908-8f4a-b722b1eacd7e
    await queryInterface.bulkDelete(
      "User",
      {
        companyId: "092cd435-dac9-4908-8f4a-b722b1eacd7e",
      },
      {}
    );
  },
};
