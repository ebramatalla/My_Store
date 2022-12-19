const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    messages: [
      {
        message: {
          type: String,
        },
        sender: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const ChatModel = mongoose.model("Chat", chatSchema);
module.exports = ChatModel;
