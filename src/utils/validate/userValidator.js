const { param } = require("express-validator");
const User = require("../..//models/userModel");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.deleteUserValidator = [
  param("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.getUserValidator = [
  param("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
