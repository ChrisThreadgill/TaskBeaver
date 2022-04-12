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
        console.log(userId)
        res.send(userId)
    })
);

// post new project
// edit selected project
// delete selected project

// get all task for a project
// post new a task
// edit selected task
// delete selected task



module.exports = router;