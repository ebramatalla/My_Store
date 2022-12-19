const expressAsyncHandler = require("express-async-handler");
const {
  getTokenWebSocket,
  getUserFromWebToken,
} = require("..//controllers/authController");
const {
  handleMessageToSupport,
  handleMessageFromSupport,
} = require("../controllers/chatController");
const {
  addUser,
  getUser,
  getAllUser,
  addAdmin,
  getAllAdmin,
} = require("./users");

const chat = (io) => {
  // middleware
  io.use(async (socket, next) => {
    const token = await getTokenWebSocket(socket);
    if (!token) {
      next(new Error("Please provide a valid token"));
    }
    const user = await getUserFromWebToken(token);
    if (!user) {
      next(new Error("token expired"));
    }
    next();
  }).on("connection", async (socket) => {
    // initialize settings
    const token = await getTokenWebSocket(socket);
    const user = await getUserFromWebToken(token);
    // when user connect show message
    socket.emit("message", `Hello ${user.name}`);
    // add user to the list of active
    addUserToActiveUser(user, socket);

    // event handler

    // event is send message to Support
    socket.on("sendMessageToSupport", (data) => {
      // handleMessage to support
      handleMessageToSupport(data.message, user.email);

      // get all active admin to send message for them
      const activeAdmins = getAllAdmin();
      if (activeAdmins) {
        for (let index = 0; index < activeAdmins.length; index++) {
          io.to(`${activeAdmins[index].socketId}`).emit("messageToSupport", {
            message: data.message,
            from: user.email,
          });
        }
      }
    });
    // event is send message to client
    socket.on("sendMessageToClient", (data) => {
      // handleMessageFromSupport
      handleMessageFromSupport(data.message, data.to);
      const activeUser = getUser(data.to);
      if (activeUser) {
        io.to(`${activeUser.socketId}`).emit("messageFromSupport", {
          message: data.message,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("user has disconnect");
    });
  });
};
const addUserToActiveUser = (user, socket) => {
  if (user.role === "admin") {
    addAdmin({ id: user.email, socketId: socket.id });
  } else if (user.role === "user") {
    addUser({ id: user.email, socketId: socket.id });
  }
};
module.exports = chat;
