const express = require("express");
const { createOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuth } = require("../middleware/isAuth");

router.post("/createOrder/:id", isAuth, createOrder);

module.exports = router;
