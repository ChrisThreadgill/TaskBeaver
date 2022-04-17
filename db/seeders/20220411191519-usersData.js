"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Brendan the Beaver",
          lastName: "TaskBeaver",
          email: "demo@taskbeaver.com",
          hashedPassword: "$2a$10$wwOjKtnH/pU9HaH.Nn0Y3eLp3GBnYwgPCbzUSuA0qVjxbjKShJhce",
          phoneNumber: "5555555555",
          occupation: null,
          bio: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Task",
          lastName: "Beaver",
          email: "Task@taskbeaver.com",
          hashedPassword: "$2a$10$naWUeaUJxCHGI8jgKEbapeJs7tdNkcemfCaFjT0LLn5AGTa1eIKde",
          phoneNumber: "5103166071",
          occupation: "moneymaker",
          bio: "Man is handsome!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Vern",
          lastName: "Chao",
          email: "Vern@taskbeaver.com",
          hashedPassword: "$2a$10$7PESWB9ZKP.WLnDysBWro.YhNH7jNCenXEM.Sqp1xrz1amSzOE9vK",
          phoneNumber: "5103166071",
          occupation: "moneymaker",
          bio: "Man is handsome!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Darren",
          lastName: "Kong",
          email: "Darren@taskbeaver.com",
          hashedPassword: "$2a$10$lDJk9HC8hztYLti4hCFI2.y2Ze5yX3TQ6vTZiSWD5hulbeOpiOn42",
          phoneNumber: "9991234567",
          occupation: "moneymaker",
          bio: "Man is a Beast",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Chris",
          lastName: "Threadgill",
          email: "Chris@taskbeaver.com",
          hashedPassword: "$2a$10$frBzs5LenJW0QfzRPS5wV.5YENlB8.FXjx7Db.lW80qH1QvHq3qjC",
          phoneNumber: "9991234567",
          occupation: "moneymaker",
          bio: "Man is a too good for life",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Josh",
          lastName: "Bautista",
          email: "Josh@taskbeaver.com",
          hashedPassword: "$2a$10$SYD9DEBREidelOu28kDofOk5qviVInc.4B3ZbjxS8koyUL9b7pR4C",
          phoneNumber: "9991234567",
          occupation: "moneymaker",
          bio: "Thug life is afraid of this man",
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
          return queryInterface.bulkDelete('People', null, {});
        */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
