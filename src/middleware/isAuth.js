const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
require("dotenv").config();

// const isAuth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     console.log(token);
//     const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     console.log(decode);
//     const user = await User.findOne({
//       _id: decode.userId,
//       "tokens.token": token,
//     });
//     if (!user) {
//       throw new Error("user not found");
//     }
//     console.log(user);
//     req.token = token;
//     req.user = user;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: "Please Auth" });
//   }
// };
// module.exports = isAuth;
exports.isAuth = AsyncHandler(async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return next(
      new ApiError(
        "You are not login, Please login to get access this route",
        401
      )
    );
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findOne({
    _id: decode.userId,
    "tokens.token": token,
  });
  if (!user) {
    return next(
      new ApiError("Token expired, Please login to get access this route", 401)
    );
  }
  req.token = token;
  req.user = user;
  next();
});
