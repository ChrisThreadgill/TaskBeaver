const express = require("express");
const { csrfProtection, asyncHandler } = require("./utils.js");
const db = require("../db/models");
const { loginUser, logoutUser } = require("../auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");

// PROJECT
// Route to get all projects.
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;

    // Will get projects based on userId.

    const projects = await db.Project.findAll({
      where: {
        userId,
      },
    });

    res.json({
      projects,
    });
  })
);

const projectValidator =[
  check("projectName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a project name."),
  check("dueDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a due date.")
]

// Route to post new project.
router.post(
  "/projects",
  csrfProtection,
  projectValidator,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { projectName, description, dueDate, url, projectType } = req.body;


    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()){


      const project = await db.Project.build({
        userId,
        projectName,
        description,
        dueDate,
        url,
        projectType,
      });
      await project.save();
      res.json({
        project,
      });


    } else {


      const errorArray = validatorErrors.array().map(error => error.msg)
      res.json({
        message: 'Unsuccessful',
        errorArray
      });


    }

  })
);

router.put(
  "/projects/:id",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    // const userId = 1;
    const { projectName, description, dueDate, url, projectType } = req.body;
    const projectsId = req.params.id;

    const projectToUpdate = await db.Project.findByPk(projectsId);
    // If project is not associated with current user then cannot update.
    if (userId === projectToUpdate.userId) {
      await projectToUpdate.update({
        projectName,
        description,
        dueDate,
        url,
        projectType,
      });
    }
    res.json({
      projectToUpdate,
    });
  })
);

// Route to delete a selected project.
router.delete(
  "/projects/:id",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    // const userId = 1
    const projectsId = req.params.id;
    const projectToDelete = await db.Project.findByPk(projectsId);
    if (projectToDelete !== undefined) {
      await projectToDelete.destroy();
      res.json({ message: "Successfully deleted." });
    }
  })
);

router.get(
  "/projects/:id",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const projectId = req.params.id;
    // *should this check specific user??
    if (userId) {
      const projectDetails = await db.Project.findByPk(projectId);
      res.json({
        projectDetails,
      });
    }
  })
);
// TASKS
// Route to get all task for a project.
router.get(
  "/projects/:id/tasks",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const projectId = req.params.id;
    // *should this check specific user??
    if (userId) {
      const tasksForProject = await db.Task.findAll({ where: { projectId } });
      res.json({
        tasksForProject,
      });
    }
  })
);

// Route to post a new task.
router.post(
  "/tasks",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { taskTitle, description, projectId, dueDate, tag, taskContactId } =
      req.body;
    if (userId) {
      const task = await db.Task.build({
        taskTitle,
        description,
        projectId,
        dueDate,
        tag,
        taskContactId,
      });

      await task.save();

      res.json({
        task,
      });
    } else {
      res.json({ message: "need to log into create task" });
    }
  })
);

// route to edit selected task based on id
router.put(
  "/tasks/:id",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;

    const taskId = req.params.id;

    const { taskTitle, description, projectId, dueDate, tag, taskContactId } =
      req.body;

    const taskToUpdate = await db.Task.findByPk(taskId);

    if (userId) {
      await taskToUpdate.update({
        taskTitle,
        description,
        projectId,
        dueDate,
        tag,
        taskContactId,
      });
    }

    res.json({
      taskToUpdate,
    });
  })
);

// route to delete selected task
router.delete(
  "/tasks/:id",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const taskId = req.params.id;

    const taskToDelete = await db.Task.findByPk(taskId);

    if (userId) {
      if (taskToDelete !== undefined) {
        await taskToDelete.destroy();
        res.json({ message: "successfully deleted." });
      }
    }
  })
);
module.exports = router;
