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
      "Proveedores",
      [
        {
          id: "00000000-0000-0000-0000-000000000000",
          proveedor: "Aeropuerto Internacional de Puerto Vallarta",
          encargado: "Jose Luis Lopez Martinez",
          email: "jlopezm@aeropuertosgap.com.mx",
          phone: "0000000000",
          address: "",
          logo: "",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Users",
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
          proveedorId: "00000000-0000-0000-0000-000000000000",
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
          proveedorId: "00000000-0000-0000-0000-000000000000",
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
          proveedorId: "00000000-0000-0000-0000-000000000000",
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
          proveedorId: "00000000-0000-0000-0000-000000000000",
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
          proveedorId: "00000000-0000-0000-0000-000000000000",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Proveedores", null, {});
  },
};
