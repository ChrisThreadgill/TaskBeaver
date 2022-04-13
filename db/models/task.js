"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      taskTitle: DataTypes.STRING,
      description: DataTypes.TEXT,
      projectId: DataTypes.INTEGER,
      dueDate: DataTypes.DATE,
      completed: DataTypes.BOOLEAN,
      tag: DataTypes.STRING,
      taskContactId: DataTypes.INTEGER,
    },
    {}
  );
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Project, { foreignKey: "projectId" });
  };
  return Task;
};
