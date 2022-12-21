const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.addProductToCartValidator = [
  body("productId").isMongoId().withMessage("product id is not valid"),
  validatorMiddleware,
];

exports.removeItemFromCartValidator = [
  param("id").isMongoId().withMessage("id is not valid"),
  validatorMiddleware,
];
exports.changeQuantityInCartValidator = [
  param("id").isMongoId().withMessage("id is not valid"),
  body("quantity").isNumeric().withMessage("quantity must ne number").custom(),
  validatorMiddleware,
];
