// Requirement
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/mongoose");
const globalError = require("./src/middleware/errorMiddleware");

// routes
const authRoute = require("..//server/src/routes/authRoute");
const categoryRoute = require("..//server/src/routes/categoryRoute");
const brandRoute = require("..//server/src/routes/brandRoute");
const userRoute = require("..//server/src/routes/userRoute");
const productRoute = require("..//server/src/routes/productRoute");
const cartRoute = require("..//server/src/routes/cartRoute");
const orderRoute = require("..//server/src/routes/orderRoute");

app.use(express.json());

// user routes
app.use(authRoute);
app.use(categoryRoute);
app.use(brandRoute);
app.use(userRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(orderRoute);

app.use(globalError);

app.listen(process.env.PORT, () => {
  console.log("app listening on port " + process.env.PORT);
});
