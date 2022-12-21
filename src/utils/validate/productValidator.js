const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const { baseModelName } = require("../../models/productModel");

exports.getProductValidator = [
  param("id").isMongoId().withMessage("invalid product id"),
  validatorMiddleware,
];

exports.productsInCategoryValidator = [
  body("category").isMongoId().withMessage("invalid product id"),
  validatorMiddleware,
];

exports.createProductValidator = [
  body("title")
    .notEmpty()
    .withMessage("enter title of product")
    .isLength({ min: 3 })
    .withMessage("Too short product title")
    .isLength({ max: 100 })
    .withMessage("Too long product title"),
  body("description")
    .notEmpty()
    .withMessage("Enter description of product")
    .isLength({ max: 10 })
    .withMessage("Too short product description"),
  body("quantity")
    .notEmpty()
    .withMessage("enter quantity of product")
    .isNumeric()
    .withMessage(" quantity of product must be a number"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be number"),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("category id is invalid"),
  body("brand")
    .notEmpty()
    .withMessage("brand is required")
    .isMongoId()
    .withMessage("brand id is invalid"),
  validatorMiddleware,
];
exports.updateProductValidator = [
  param("id").isMongoId().withMessage("invalid id"),
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short product title")
    .isLength({ max: 100 })
    .withMessage("Too long product title"),
  body("description")
    .optional()
    .isLength({ max: 10 })
    .withMessage("Too short product description"),
  body("quantity")
    .optional()
    .isNumeric()
    .withMessage(" quantity of product must be a number"),
  body("price").optional().isNumeric().withMessage("price must be number"),
  body("category").optional().isMongoId().withMessage("category id is invalid"),
  body("brand").optional().isMongoId().withMessage("brand id is invalid"),
  validatorMiddleware,
];
exports.deleteProductValidator = [
  param("id").isMongoId().withMessage("id is invalid"),
  validatorMiddleware,
];
