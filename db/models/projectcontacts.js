'use strict';
module.exports = (sequelize, DataTypes) => {
  const projectContacts = sequelize.define('projectContacts', {
    projectId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER
  }, {});
  projectContacts.associate = function(models) {
    // associations can be defined here
  };
  return projectContacts;
};