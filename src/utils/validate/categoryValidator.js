const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("please enter name")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters")
    .isLength({ max: 16 })
    .withMessage("name must be at max 16 characters"),
  validatorMiddleware,
];
exports.getCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category id "),
  validatorMiddleware,
];
exports.updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category id "),
  body("name")
    .notEmpty()
    .withMessage("please enter name")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters")
    .isLength({ max: 16 })
    .withMessage("name must be at max 16 characters"),
  validatorMiddleware,
];
exports.deleteCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category id "),
  validatorMiddleware,
];
