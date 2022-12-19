const factory = require("./handlersFactory");
const User = require("../models/userModel");
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
      role: req.body.role,
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
