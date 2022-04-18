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
          projectType: "Work",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Get Back Out on the Farm!! C B eavers D on't Stop working!",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Personal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Step Beaver I'm stuck under the Dam!",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Personal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Study for Week 6",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Homework",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Learn How to Reduce",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Homework",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          projectName: "Become First Software Engineer Beaver",
          description: "This is for myself and only myself",
          dueDate: new Date("2040-02-11"),
          url: null,
          projectType: "Project",
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
