const express = require("express");
const { createOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuth } = require("../middleware/isAuth");
const isRole = require("../middleware/isRole");
const { Roles } = require("../models/userModel");
const { createOrderValidator } = require("../utils/validate/orderValidator");

router.post(
  "/createOrder/:id",
  isAuth,
  isRole([Roles.user]),
  createOrderValidator,
  createOrder
);

module.exports = router;
