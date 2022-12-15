const express = require("express");

const {
  signUp,
  login,
  logout,
  logoutFromAll,
} = require("../controllers/authController");
const { isAuth } = require("../middleware/isAuth");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", isAuth, logout);
router.post("/logoutAll", isAuth, logoutFromAll);

module.exports = router;
