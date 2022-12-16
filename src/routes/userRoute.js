const express = require("express");
const {
  me,
  changePassword,
  updateUser,
  deleteUser,
  deleteMyAccount,
  getUsers,
} = require("../controllers/userController");
const { isAuth } = require("../middleware/isAuth");
const router = express.Router();
// for users
router.get("/me", isAuth, me);
router.patch("/changePassword", isAuth, changePassword);
router.patch("/userUpdate", isAuth, updateUser);
router.delete("/deleteMyAccount/:id", isAuth, deleteMyAccount);

// for admin
router.delete("/deleteMyAccount/:id", isAuth, deleteUser);
router.get("/allUsers", getUsers);

module.exports = router;
