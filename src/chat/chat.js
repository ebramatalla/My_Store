const {
  getTokenWebSocket,
  getUserFromWebToken,
} = require("..//controllers/authController");
const { handleMessage } = require("../controllers/chatController");
const { addUser, getUser, getAllUser } = require("./users");

const chat = (io) => {
  io.use(async (socket, next) => {
    const token = await getTokenWebSocket(socket);
    if (!token) {
      next(new Error("Please Login"));
    }
    next();
  }).on("connection", async (socket) => {
    // when user connect show message ho
    const token = await getTokenWebSocket(socket);
    const user = await getUserFromWebToken(token);
    addUser({ id: user._id.toString(), socketId: socket.id });
    if (!user) {
      next(new Error("user not found"));
    }
    socket.emit("message", `Hello ${user.name}`);
    // event is send message
    socket.on("sendMessage", (data) => {
      handleMessage(data.message, user._id, data.to);
      // and listen is message
      const activeUser = getUser(data.to);
      if (activeUser) {
        io.to(`${activeUser.socketId}`).emit("message", data);
      }
    });

    socket.on("disconnect", () => {
      console.log("user has disconnect");
    });
  });
};
module.exports = chat;
