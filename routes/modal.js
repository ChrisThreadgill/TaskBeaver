const express = require("express");
const { csrfProtection, asyncHandler, userValidators, loginValidators } = require("./utils.js");
const db = require("../db/models");
const { loginUser, logoutUser } = require("../auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");

/* GET home page. */
router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    let user = {};
    let projects = {};
    let navBarTasks = { inProgress: 0, dueToday: 0, completed: 0 };

    if (req.session.auth) {
      const userId = req.session.auth.userId;
      user = await db.User.findByPk(userId);
      projects = await db.Project.findAll({
        where: {
          userId,
        },
        include: db.Task,
        order: [
          ["id", "ASC"],
          [db.Task, "createdAt", "asc"],
        ],
      });
    }
    res.render("modal", {
      title: "Test Modal",
      user,
      projects,
      navBarTasks,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/sign-up",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res, next) => {
    let projects = {};
    let tasks = { taskTitle: "Make a new Task" };
    let projectDisplay = { projectName: "Project Title" };
    let navBarTasks = { inProgress: 0, dueToday: 0, completed: 0 };
    const { firstName, lastName, email, hashedPassword, phoneNumber, occupation, bio } = req.body;
    const user = await db.User.build({
      firstName,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      occupation,
      bio,
    });

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const salt = parseInt(process.env.SALT, 10);
      const hash = await bcrypt.hash(hashedPassword, salt);
      user.hashedPassword = hash;
      await user.save();
      loginUser(req, res, user);
      res.redirect("/");
    } else {
      const errorArray = errors.array().map((error) => error.msg);
      res.render("modal", {
        title: "Sign-Up",
        errorArray,
        user,
        projects,
        projectDisplay,
        tasks,
        navBarTasks,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res, next) => {
    let user = {};
    let projects = {};
    let tasks = { taskTitle: "Make a new Task" };
    let projectDisplay = { projectName: "Project Title" };
    let navBarTasks = { inProgress: 0, dueToday: 0, completed: 0 };
    const { email, hashedPassword } = req.body;
    let errors = [];
    const loginErrors = validationResult(req);

    if (loginErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(hashedPassword, user.hashedPassword.toString());
        if (passwordMatch) {
          loginUser(req, res, user);
          req.session.save(() => res.redirect("/"));

          return;
        }
      }
      errors.push("Login Failed");
    } else {
      errors = loginErrors.array().map((error) => error.msg);
    }
    res.render("modal", {
      title: "Home",
      email,
      errors,
      user,
      projects,
      projectDisplay,
      tasks,
      navBarTasks,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    logoutUser(req, res);
    req.session.save(() => res.redirect("/"));
  })
);

module.exports = router;
