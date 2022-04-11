'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectContact = sequelize.define('ProjectContact', {
    projectId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER
  }, {});
  ProjectContact.associate = function(models) {
    // associations can be defined here
  };
  return ProjectContact;
};