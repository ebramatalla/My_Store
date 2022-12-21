const { body, param } = require("express-validator");
const Brand = require("../..//models/brandModel");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

// The middlewares
exports.getBrandValidator = [
  param("id").isMongoId().withMessage("Invalid Brand id "),
  validatorMiddleware,
];

exports.createBrandValidator = [
  body("name")
    .notEmpty()
    .withMessage("please enter name of brand")
    .isLength({ min: 3 })
    .withMessage("name is too short")
    .isLength({ max: 16 })
    .withMessage("name is too long"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  param("id").isMongoId().withMessage("Invalid Brand id format"),
  body("name")
    .notEmpty()
    .withMessage("please enter name of brand")
    .isLength({ min: 3 })
    .withMessage("name is too short")
    .isLength({ max: 16 })
    .withMessage("name is too long"),
  validatorMiddleware,
];
exports.deleteBrandValidator = [
  param("id").isMongoId().withMessage("Invalid Brand id "),
  validatorMiddleware,
];
