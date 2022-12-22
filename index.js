// Requirement
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/mongoose");
const globalError = require("./src/middleware/errorMiddleware");
require("./src/chat/chat");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const chat = require("./src/chat/chat");
const fileUpload = require("express-fileupload");

// chat
chat(io);

// routes
const authRoute = require("..//server/src/routes/authRoute");
const categoryRoute = require("..//server/src/routes/categoryRoute");
const brandRoute = require("..//server/src/routes/brandRoute");
const userRoute = require("..//server/src/routes/userRoute");
const productRoute = require("..//server/src/routes/productRoute");
const cartRoute = require("..//server/src/routes/cartRoute");
const orderRoute = require("..//server/src/routes/orderRoute");
const chatRoute = require("..//server/src/routes/chatRoute");

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 },
  })
);

// user routes
app.use(authRoute);
app.use(categoryRoute);
app.use(brandRoute);
app.use(userRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(orderRoute);
app.use(chatRoute);

app.use(globalError);

server.listen(process.env.PORT, () => {
  console.log("app listening on port " + process.env.PORT);
});
