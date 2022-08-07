const ChatModel = require("../db/models/chat.model");

class ChatsService {
  async find() {
    return ChatModel.find().exec();
  }

  async findOne(id) {
    const chat = await ChatModel.findById(id).exec();
    if (!chat) {
      throw new Error("Chat not found");
    }
    return chat;
  }

  async create(chat) {
    const newChat = new ChatModel(chat);
    return newChat.save();
  }
}

module.exports = ChatsService;
