'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskTitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    projectId: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    tag: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};