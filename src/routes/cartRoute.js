const express = require("express");
const {
  addProductToCart,
  getMyCart,
  removeItemFromCart,
  changeQuantityInCart,
} = require("../controllers/cartController");
const { isAuth } = require("../middleware/isAuth");
const router = express.Router();

router.post("/addProductToCart", isAuth, addProductToCart);
router.get("/myCart", isAuth, getMyCart);
router.delete("/removeItemFromCart/:id", isAuth, removeItemFromCart);
router.patch("/changeQuantityInCart/:id", isAuth, changeQuantityInCart);

module.exports = router;
