'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    occupation: DataTypes.STRING,
    prefCommunication: DataTypes.STRING,
    contactAssociation: DataTypes.STRING
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here

    const columnMapping = {
      through: "projectContact",
      otherKey: 'projectId',
      foreignKey: 'contactId',
    }

    Contact.belongsToMany(models.Project, columnMapping)
  };
  return Contact;
};
