const { body, validationResult } = require("express-validator");
const User = require("../..//models/userModel");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

// description  this middleware that handles invalid input
exports.signupValidator = [
  body("name")
    .notEmpty()
    .withMessage("Please enter your name")
    .isLength({ min: 3 })
    .withMessage("name is too short"),
  body("email")
    .notEmpty()
    .withMessage("enter your email address")
    .isEmail()
    .withMessage("Please enter Valid email address")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error("email is already used");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("enter your password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validatorMiddleware,
];

exports.loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("enter your email address")
    .isEmail()
    .withMessage("Please enter Valid email address"),
  body("password")
    .notEmpty()
    .withMessage("enter your password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validatorMiddleware,
];
