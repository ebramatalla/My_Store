const factory = require("./handlersFactory");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcrypt");

// @description get logged in user
// @access      All/Logged
exports.me = (req, res) => {
  return res.status(200).send({ data: req.user });
};

// @description    Create user
// @route   POST  /Users
// @access  Private/Admin
exports.createUser = factory.createOne(User);

// @description get all users
// @route GET /Users
// @access Private/Admin
exports.getUsers = factory.getAll(User);

// @description get all users
// @route GET /Users/:userId
// @access Private/Admin
exports.getOne = factory.getOne(User);

// @description update user
// @route put /Users/:id
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).send({ data: document });
});

// @description change password for user
exports.changePassword = asyncHandler(async (req, res, next) => {
  if (!(await bcrypt.compare(req.body.oldPassword, req.user.password))) {
    return next(new ApiError(`old password is incorrect`, 403));
  }
  const document = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    { new: true }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).send({ data: document });
});

exports.deleteMyAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user._id);
  user.remove();
  res.status(200).send({ data: "Your Email is Removed" });
});

// @description    Delete specific user
// @route   DELETE /users/:id
// @access  Private/Admin
exports.deleteUser = factory.deleteOne(User);

//@description     add Product to wish list
// @route          Post /addProductToWishList
// @access         User
exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  // check if product in wish list already
  const productIndex = req.user.wishlist.findIndex(
    (item) => item.toString() === product.id.toString()
  );
  if (productIndex > -1) {
    return next(new ApiError("Product already in wish list", 400));
  }
  req.user.wishlist.push(product._id);
  req.user.save();
  res.status(200).send(req.user.wishlist);
});

// @description   remove product from wish list

exports.removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  // find index
  const productIndex = req.user.wishlist.findIndex(
    (item) => item.toString() === product.id.toString()
  );
  if (productIndex > -1) {
    req.user.wishlist.splice(productIndex, 1);
    req.user.save();
    res.status(200).send(req.user.wishlist);
  } else {
    res.status(400).send({ message: "this item is not in your wish list" });
  }
});
exports.myWishlist = asyncHandler(async (req, res, next) => {
  res.status(200).send(req.user.wishlist);
});
