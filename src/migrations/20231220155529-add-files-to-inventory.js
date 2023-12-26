"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Inventory", "files", {
      type: Sequelize.JSON,
      defaultValue: JSON.stringify([
        {
          title: "",
          description: "",
          file: {
            fileName: "",
            fileSize: "",
            fileType: "",
            filePath: "",
          },
        },
      ]),
      allowNull: false,
      after: "images",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Inventory", "files");
  },
};
