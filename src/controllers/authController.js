const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const createToken = require("../utils/createToken");
const User = require("../models/userModel");

// @description  SignUp
// @route        post /signUp
// access        All Role
exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = createToken(user._id);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  res.status(201).send({ data: user, token });
});

// @description login
// @route       /login
// @access      All Role
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }); // find the user

  // if user is not found return Error
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("email or password Is incorrect", 401));
  }

  const token = createToken(user._id);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  // this to don't return password
  delete user._doc.password;

  res.status(200).json({ data: user, token });
});

exports.logout = asyncHandler(async (req, res, next) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token;
  });
  await req.user.save();

  res.status(200).send({ data: "Logged out" });
});
exports.logoutFromAll = asyncHandler(async (req, res, next) => {
  req.user.tokens = [];
  await req.user.save();
  res.send();
});

exports.getTokenWebSocket = asyncHandler((socket) => {
  if (!socket.handshake.headers["token"]) {
    return new Error("Invalid token please log in again");
  }
  const token = socket.handshake.headers["token"].replace("Bearer ", "");
  if (!token) {
    return null;
  }
  return token;
});
exports.getUserFromWebToken = asyncHandler(async (token) => {
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findOne({
    _id: decode.userId,
    "tokens.token": token,
  });
  if (!user) {
    return null;
  }
  return user;
});
