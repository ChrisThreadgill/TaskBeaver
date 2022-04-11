"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            hashedPassword: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            phoneNumber: {
                type: Sequelize.STRING(10),
            },
            occupation: {
                type: Sequelize.STRING,
            },
            bio: {
                type: Sequelize.TEXT,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Users");
    },
};