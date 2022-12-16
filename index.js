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

app.use(express.json());

// user routes
app.use(authRoute);
app.use(categoryRoute);
app.use(brandRoute);

app.use(globalError);

app.listen(process.env.PORT, () => {
  console.log("app listening on port " + process.env.PORT);
});
