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
const isRole = require("../middleware/isRole");
const { Roles } = require("../models/userModel");
const {
  changeUserPasswordValidator,
  updateUserValidator,
  addProductToWishListValidator,
  removeProductFromWishListValidator,
  deleteAccount,
  deleteAccountValidator,
} = require("../utils/validate/userValidator");
const router = express.Router();
// for users
router.get("/me", isAuth, me);
router.patch(
  "/changePassword",
  isAuth,
  isRole([Roles.user, Roles.admin]),
  changeUserPasswordValidator,
  changePassword
);
router.patch("/userUpdate", isAuth, updateUserValidator, updateUser);
router.delete(
  "/deleteMyAccount",
  isAuth,
  isRole([Roles.user]),
  deleteMyAccount
);
router.post(
  "/addProductToWishList/:id",
  isAuth,
  isRole([Roles.user]),
  addProductToWishListValidator,
  addProductToWishList
);
router.get("/myWishlist", isAuth, isRole([Roles.user]), myWishlist);
router.delete(
  "/removeProductFromWishList/:id",
  isAuth,
  removeProductFromWishListValidator,
  removeProductFromWishList
);

// for admin
router.delete(
  "/deleteAccount/:id",
  isAuth,
  isRole([Roles.admin]),
  deleteAccountValidator,
  deleteUser
);
router.get("/allUsers", getUsers);

module.exports = router;
