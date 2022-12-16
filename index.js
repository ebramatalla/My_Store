// Requirement
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/mongoose");
const globalError = require("./src/middleware/errorMiddleware");
const createToken = require("./src/utils/createToken");
const authRoute = require("..//server/src/routes/authRoute");
const categoryRoute = require("..//server/src/routes/categoryRoute");

app.use(express.json());
app.use(authRoute);
app.use(categoryRoute);

app.use(globalError);

app.listen(process.env.PORT, () => {
  console.log("app listening on port " + process.env.PORT);
});
