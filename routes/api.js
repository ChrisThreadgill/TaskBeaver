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
            res.json({
                project
            })
        }))
    // edit selected project
    // Will need to make a validator
    //check projectName
router.put('/projects/:id', asyncHandler(async(req, res, next) => {
    // const { userId } = req.session.auth
    const userId = 1;
    const { projectName, description, dueDate, url, projectType } = req.body
    const projectsId = req.params.id

    // console.log(projectsId)
    // console.log('---------------------')
    // console.log(projectName)
    const projectToUpdate = await db.Project.findByPk(projectsId)
        // If project is not associated with current user then cannot update.
    if (userId === projectToUpdate.userId) {

        await projectToUpdate.update({
            projectName,
            description,
            dueDate,
            url,
            projectType
        });
    }
    res.json({
        projectToUpdate
    })
}));
// delete selected project

router.delete('/projects/:id', asyncHandler(async(req, res, next) => {

    const { userId } = req.session.auth
        // const userId = 1
    const projectsId = req.params.id
    const projectToDelete = await db.Project.findByPk(projectsId);

    if (userId)

        if (projectToDelete !== undefined) {
        await projectToDelete.destroy();
        res.json({ message: "Successfully deleted." })
    }
}))

router.get("/projects/:id", asyncHandler(async(req, res, next) => {
        const { userId } = req.session.auth
        const projectId = req.params.id
        const tasksForProject = await db.Task.findAll({ where: { projectId } })
        res.json({
            tasksForProject
        })
    }))
    // TASKS

// get all task for a project
router.get("/projects/:id", asyncHandler(async(req, res, next) => {
    const { userId } = req.session.auth
    const projectId = req.params.id
        // *should this check specific user??
    if (userId) {
        const tasksForProject = await db.Task.findAll({ where: { projectId } })
        res.json({
            tasksForProject
        })
    }

}))

// post new a task
router.post("/tasks", asyncHandler(async(req, res, next) => {
        const { userId } = req.session.auth
            // const userId = 1;
        const { taskTitle, description, projectId, dueDate, tag, taskContactId } = req.body
        if (userId) {
            const task = await db.Task.build({
                taskTitle,
                description,
                projectId,
                dueDate,
                tag,
                taskContactId
            });

            await task.save()

            res.json({
                task
            })
        } else {
            res.json({ message: "need to log into create task" })
        }
    }))
    // edit selected task
    // delete selected task
module.exports = router;