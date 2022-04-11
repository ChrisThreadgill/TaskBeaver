"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          */
        return queryInterface.bulkInsert(
            "Users", [{
                firstName: "Demo1",
                lastName: "TaskBeaver",
                email: "demon@taskbeaver.com",
                hashedPassword: "password",
                phoneNumber: "5555555555",
                occupation: null,
                bio: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }, ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('Users', null, {});
    },
};