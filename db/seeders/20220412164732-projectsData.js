"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Projects",
      [
        {
          userId: 1,
          projectName: "Build a Dam Project Now",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "DAM BOI U",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Build a Dam Project Now",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Personal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Build a Dam Project Now",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Personal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Build a Dam Project Now",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Build a Dam Project Now",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Groceries",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Build a Dam Project Now",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Just why?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Projects", null, {});
  },
};
