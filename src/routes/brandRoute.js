const express = require("express");
const {
  createBrand,
  getBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const router = express.Router();
const { isAuth } = require("../middleware/isAuth");
const isRole = require("../middleware/isRole");
const { Roles } = require("../models/userModel");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validate/brandValidator");
// this route is used to get the all brand
router.get("/brand", isAuth, isRole([Roles.user, Roles.admin]), getAllBrands);

// this route is used to get one brand by id
router.get(
  "/brand/:id",
  isAuth,
  isRole([Roles.user, Roles.admin]),
  getBrandValidator,
  getBrand
);

// this route is used to create a brand
router.post(
  "/brand",
  isAuth,
  isRole([Roles.admin]),
  createBrandValidator,
  createBrand
);

// this route is used to update a brand
router.patch(
  "/brand/:id",
  isAuth,
  isRole([Roles.admin]),
  updateBrandValidator,
  updateBrand
);

// this route is used to delete a brand by id
router.delete(
  "/brand/:id",
  isAuth,
  isRole([Roles.admin]),
  deleteBrandValidator,
  deleteBrand
);
module.exports = router;
