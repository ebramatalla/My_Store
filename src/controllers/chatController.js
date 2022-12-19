const Chat = require("..//models/chatModel");

exports.handleMessage = async (message, sender, recipient) => {
  const previousChat = await Chat.findOne({
    $or: [
      { user1: recipient, user2: sender },
      { user1: sender, user2: recipient },
    ],
  });
  if (!previousChat) {
    const newChat = await Chat.create({
      user1: recipient,
      user2: sender,
      messages: [{ message: message, sender: sender }],
    });
  } else {
    previousChat.messages.push({ message: message, sender: sender });
    previousChat.save();
  }
};
