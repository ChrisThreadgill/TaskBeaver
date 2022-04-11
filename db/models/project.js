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
    const columnMapping = {
      through: "projectContact",
      otherKey: 'contactId',
      foreignKey: 'projectId',
    }
    Project.belongsTo(models.User, {foreignKey: "userId"})
    Project.hasMany(models.Task, {foreignKey: "projectId"})
    Project.belongsToMany(models.Contact, columnMapping)
  };
  return Project;
};
