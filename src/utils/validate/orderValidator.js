const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.createOrderValidator = [
  param("id").isMongoId().withMessage("Invalid Cart id "),
  validatorMiddleware,
];
