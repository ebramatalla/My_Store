const express = require("express");
const {
  addProductToCart,
  getMyCart,
  removeItemFromCart,
  changeQuantityInCart,
} = require("../controllers/cartController");
const { isAuth } = require("../middleware/isAuth");
const isRole = require("../middleware/isRole");
const { Roles } = require("../models/userModel");
const {
  addProductToCartValidator,
  removeItemFromCartValidator,
  changeQuantityInCartValidator,
} = require("../utils/validate/cartValidator");
const router = express.Router();

router.post(
  "/addProductToCart",
  isAuth,
  isRole([Roles.user]),
  addProductToCartValidator,
  addProductToCart
);
router.get("/myCart", isAuth, getMyCart);
router.delete(
  "/removeItemFromCart/:id",
  isAuth,
  isRole([Roles.user]),
  removeItemFromCartValidator,
  removeItemFromCart
);
router.patch(
  "/changeQuantityInCart/:id",
  isAuth,
  isRole([Roles.user]),
  changeQuantityInCartValidator,
  changeQuantityInCart
);

module.exports = router;
