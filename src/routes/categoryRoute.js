const express = require("express");
const {
  createCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();
const { isAuth } = require("../middleware/isAuth");
const isRole = require("../middleware//isRole");
const { Roles } = require("../models/userModel");
const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validate/categoryValidator");

// this route is to add a category
router.post(
  "/category",
  isAuth,
  isRole([Roles.admin]),
  createCategoryValidator,
  createCategory
);

// this route is to  get  all categories
router.get(
  "/categories",
  isAuth,
  isRole([Roles.admin, Roles.user]),
  getCategories
);

// this route is to get a category
router.get(
  "/category/:id",
  isAuth,
  isRole([Roles.admin, Roles.user]),
  getCategoryValidator,
  getOneCategory
);
// this route is to update a category
router.patch(
  "/category/:id",
  isAuth,
  isRole([Roles.admin]),
  updateCategoryValidator,
  updateCategory
);

// this route is to delete a category
router.delete(
  "/category/:id",
  isAuth,
  isRole([Roles.admin]),
  deleteCategoryValidator,
  deleteCategory
);

module.exports = router;
