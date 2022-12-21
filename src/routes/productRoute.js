const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  getProductInCategory,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAuth } = require("../middleware/isAuth");
const isRole = require("../middleware/isRole");
const { Roles } = require("../models/userModel");
const {
  getProductValidator,
  createProductValidator,
  productsInCategoryValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validate/productValidator");
const router = express.Router();
router.get("/products", isAuth, isRole([Roles.admin, Roles.user]), getProducts);
router.get(
  "/product/:id",
  isAuth,
  isRole([Roles.admin, Roles.user]),
  getProductValidator,
  getProduct
);
router.get(
  "/productsInCategory",
  isAuth,
  isRole([Roles.admin, Roles.user]),
  productsInCategoryValidator,
  getProductInCategory
);
router.post(
  "/product",
  isAuth,
  isRole([Roles.admin]),
  createProductValidator,
  createProduct
);
router.patch(
  "/updateProduct/:id",
  isAuth,
  isRole([Roles.admin]),
  updateProductValidator,
  updateProduct
);
router.delete(
  "/deleteProduct/:id",
  isAuth,
  isRole([Roles.admin]),
  deleteProductValidator,
  deleteProduct
);

module.exports = router;
