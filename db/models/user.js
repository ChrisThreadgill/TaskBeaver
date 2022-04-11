"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            hashedPassword: DataTypes.STRING.BINARY,
            phoneNumber: DataTypes.INTEGER,
            occupation: DataTypes.STRING,
            bio: DataTypes.TEXT,
        }, {}
    );
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Project, { foreignKey: "userId" });
    };
    return User;
};