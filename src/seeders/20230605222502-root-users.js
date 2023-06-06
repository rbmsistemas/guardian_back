"use strict";
const bcrypt = require("bcryptjs");
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
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "root",
          lastName: "root",
          email: "root@guardian.com",
          password: await encryptPassword("root"),
          userName: "root",
          rol: 1,
          phone: "0000000000",
          photo: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jose Luis",
          lastName: "Lopez Martinez",
          email: "jlopezm@aeropuertosgap.com.mx",
          phone: "0000000000",
          password: await encryptPassword("jlopezm"),
          userName: "jlopezm",
          rol: 2,
          photo: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Julio Francisco",
          lastName: "Bahena Ayala",
          email: "jbahena@aeropuertosgap.com.mx",
          phone: "0000000000",
          password: await encryptPassword("jbahena"),
          userName: "jbahena",
          rol: 2,
          photo: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Raul",
          lastName: "Belloso Medina",
          email: "rbelloso@aeropuertosgap.com.mx",
          phone: "0000000000",
          password: await encryptPassword("rbelloso"),
          userName: "rbelloso",
          rol: 2,
          photo: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Edgar Martin",
          lastName: "Cisneros Perez",
          email: "ecisneros@aeropuertosgap.com.mx",
          phone: "0000000000",
          password: await encryptPassword("ecisneros"),
          userName: "ecisneros",
          rol: 2,
          photo: "",
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
