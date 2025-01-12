"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "minhtung7623@gmail.com",
        password: "12345",
        firstName: "Minh",
        lastName: "Tung",
        address: "Thai Binh",
        phoneNumber: "0329723748",
        gender: "1",
        image: " ",
        roleId: "R1",
        positionId: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
