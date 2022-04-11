const express = require("express");
const { csrfProtection, asyncHandler } = require("./utils.js");
const db = require("../db/models");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "a/A Express Skeleton Home" });
});

router.get(
  "/sign-up",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const user = await db.User.build();

    res.render("sign-up", {
      title: "Sign-Up",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/sign-up",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const {
      firstName,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      occupation,
      bio,
    } = req.body;

    console.log(firstName);

    const user = await db.User.build({
      firstName,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      occupation,
      bio,
    });

    await user.save();

    res.redirect("/");
  })
);

module.exports = router;
