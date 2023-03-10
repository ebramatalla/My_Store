const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    messages: [
      {
        message: {
          type: String,
        },
        sender: { type: String },
        time: { type: Date, default: Date.now() },
      },
    ],
    user1: {
      type: String,
      required: true,
    },
    user2: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ChatModel = mongoose.model("Chat", chatSchema);
module.exports = ChatModel;
