"use strict";
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Company",
      [
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: "Aeropuerto Internacional de Puerto Vallarta",
          email: "jlopezm@aeropuertosgap.com.mx",
          phone: "0000000000",
          manager: "Jose Luis Lopez Martinez",
          logo: "",
          comments: "",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "User",
      [
        {
          id: "00000000-0000-0000-0000-000000000000",
          firstName: "root",
          lastName: "root",
          email: "root@guardian.com",
          password: await encryptPassword("root"),
          userName: "root",
          rol: 1,
          phone: "0000000000",
          photo: "",
          companyId: "00000000-0000-0000-0000-000000000000",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid.v4(),
          firstName: "Jose Luis",
          lastName: "Lopez Martinez",
          email: "jlopezm@aeropuertosgap.com.mx",
          phone: "0000000000",
          password: await encryptPassword("jlopezm"),
          userName: "jlopezm",
          rol: 2,
          photo: "",
          companyId: "00000000-0000-0000-0000-000000000000",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid.v4(),
          firstName: "Julio Francisco",
          lastName: "Bahena Ayala",
          email: "jbahena@aeropuertosgap.com.mx",
          phone: "0000000000",
          password: await encryptPassword("jbahena"),
          userName: "jbahena",
          rol: 2,
          photo: "",
          companyId: "00000000-0000-0000-0000-000000000000",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid.v4(),
          firstName: "Raul",
          lastName: "Belloso Medina",
          email: "rbelloso@aeropuertosgap.com.mx",
          phone: "0000000000",
          password: await encryptPassword("rbelloso"),
          userName: "rbelloso",
          rol: 2,
          photo: "",
          companyId: "00000000-0000-0000-0000-000000000000",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid.v4(),
          firstName: "Edgar Martin",
          lastName: "Cisneros Perez",
          email: "ecisneros@aeropuertosgap.com.mx",
          phone: "0000000000",
          password: await encryptPassword("ecisneros"),
          userName: "ecisneros",
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
    await queryInterface.bulkDelete("User", null, {});
    await queryInterface.bulkDelete("Company", null, {});
  },
};
