const express = require("express");

const {
  signUp,
  login,
  logout,
  logoutFromAll,
} = require("../controllers/authController");
const { isAuth } = require("../middleware/isAuth");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validate/authValidator");

const router = express.Router();

router.post("/signup", signupValidator, signUp);
router.post("/login", loginValidator, login);
router.post("/logout", isAuth, logout);
router.post("/logoutAll", isAuth, logoutFromAll);

module.exports = router;
