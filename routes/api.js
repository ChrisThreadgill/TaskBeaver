const express = require("express");
const {
    csrfProtection,
    asyncHandler,
} = require("./utils.js");
const db = require("../db/models");
const { loginUser, logoutUser } = require("../auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");

// get all projects
router.get(
    "/",
    asyncHandler(async(req, res, next) => {
        const { userId } = req.session.auth;
        // we get projects based on userId

        // console.log(userId)
        console.log("LOOK HERE!")

        const projects = await db.Project.findAll({
                where: {
                    userId,
                }
            })
            // console.log(userId)
            // res.send(userId)

        res.json({
            projects
        })
    })
);

// PROJECT
// '/api/projects'
// post new project
router.post('/projects',
        asyncHandler(async(req, res, next) => {
            const { userId } = req.session.auth
            const { projectName, description, dueDate, url, projectType } = req.body
            const project = await db.Project.build({
                userId,
                projectName,
                description,
                dueDate,
                url,
                projectType
            });
            await project.save()
            console.log("made new project")
        }))
    // edit selected project
router.put('/project/:projectId', asyncHandler(async(req, res, next) => {
        const { userId } = req.session.auth
        const { projectName, description, dueDate, url, projectType } = req.body
        const project = await db.Project.build({
            userId,
            projectName,
            description,
            dueDate,
            url,
            projectType
        });
        await project.save()
        console.log("edit new project")
    }))
    // delete selected project

// TASKS

// get all task for a project
// post new a task
// edit selected task
// delete selected task



module.exports = router;