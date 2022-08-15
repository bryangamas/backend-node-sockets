const boom = require("@hapi/boom");
const ChatModel = require("../db/models/chat.model");
const MessageModel = require("../db/models/message.model");
const { socket } = require("../libs/socket");

class MessagesService {
  async find(chatId, query) {
    const chat = await ChatModel.findById(chatId).exec();
    if (!chat) {
      throw boom.notFound("Chat not found");
    }
    const { page = 0, limit = 20 } = query;
    return MessageModel.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(page * limit)
      .populate("user", ["name"])
      .exec();
  }

  async create(chatId, message) {
    const chat = await ChatModel.findById(chatId).exec();
    if (!chat) {
      throw boom.notFound("Chat not found");
    }
    if (chat.users.indexOf(message.user) === -1) {
      throw boom.badRequest("User is not part of this chat");
    }
    const newMessage = await new MessageModel({
      message: message.message,
      chat: chatId,
      user: message.user,
    }).save();

    socket.io.emit("message", newMessage);

    return newMessage;
  }
}

module.exports = MessagesService;
