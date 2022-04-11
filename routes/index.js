const express = require("express");
const {
  csrfProtection,
  asyncHandler,
  lowerCase,
  upperCase,
  oneNumeric,
  alphaNumeric,
  eightCharacters,
} = require("./utils.js");
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
    res.render("index", {
      title: "a/A Express Skeleton Home",
      csrfToken: req.csrfToken(),
    });
  })
);

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

const userValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name")
    .isLength({ max: 50 })
    .withMessage("First name cannot be more than 50 characters long"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name")
    .isLength({ max: 50 })
    .withMessage("Last name cannot be more than 50 characters long"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email")
    .isLength({ max: 255 })
    .withMessage("email cannot be more than 255 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),
  check("hashedPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please Provide a password")
    .isLength({ max: 255 })
    .withMessage("password must be less than 255 characters")
    .matches(lowerCase)
    .withMessage(
      "Please input a password with at least one lower case character"
    )
    .matches(upperCase)
    .withMessage(
      "Please input a password with at least one upper case character"
    )
    .matches(oneNumeric)
    .withMessage("Please input a password with at least one numeric character")
    .matches(alphaNumeric)
    .withMessage(
      "Please input a password with at least one alpha numeric character"
    )
    .matches(eightCharacters)
    .withMessage("Please input a password at least eight characters long"),

  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 255 })
    .withMessage("Confirm Password must not be more than 255 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.hashedPassword) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
  check("phoneNumber")
    .isLength({ max: 10 })
    .withMessage("Please input phone number with at most 10 digits"),
  check("occupation")
    .isLength({ max: 255 })
    .withMessage("Max character limit is 255 characters"),
];

router.post(
  "/sign-up",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      occupation,
      bio,
    } = req.body;

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
      res.render("sign-up", {
        title: "Sign-Up",
        errorArray,
        user,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your login email address."),
  check("hashedPassword")
    .exists({ checkFalsy: true })
    .withMessage("Don't forget your password!"),
];

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res, next) => {
    const { email, hashedPassword } = req.body;
    let errors = [];
    const loginErrors = validationResult(req);
    // console.log(req.body);

    if (loginErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          hashedPassword,
          user.hashedPassword.toString()
        );
        if (passwordMatch) {
          loginUser(req, res, user);
          req.session.save(() => res.redirect("/"));

          return;
        }
      }
      errors.push("Login Failed");
    } else {
      errors = loginErrors.array().map((error) => error.message);
    }
    res.render("index", {
      title: "Home",
      email,
      errors,
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
