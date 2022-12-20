const express = require("express");
const {
  me,
  changePassword,
  updateUser,
  deleteUser,
  deleteMyAccount,
  getUsers,
  addProductToWishList,
  removeProductFromWishList,
  myWishlist,
} = require("../controllers/userController");
const { isAuth } = require("../middleware/isAuth");
const router = express.Router();
// for users
router.get("/me", isAuth, me);
router.patch("/changePassword", isAuth, changePassword);
router.patch("/userUpdate", isAuth, updateUser);
router.delete("/deleteMyAccount/:id", isAuth, deleteMyAccount);
router.post("/addProductToWishList/:id", isAuth, addProductToWishList);
router.get("/myWishlist", isAuth, myWishlist);
router.delete(
  "/removeProductFromWishList/:id",
  isAuth,
  removeProductFromWishList
);

// for admin
router.delete("/deleteMyAccount/:id", isAuth, deleteUser);
router.get("/allUsers", getUsers);

module.exports = router;
