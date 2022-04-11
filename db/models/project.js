'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    userId: DataTypes.INTEGER,
    projectName: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE,
    url: DataTypes.STRING,
    projectType: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};