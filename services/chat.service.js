const boom = require("@hapi/boom");
const ChatModel = require("../db/models/chat.model");
const UserModel = require("../db/models/user.model");

class ChatsService {
  async find() {
    return ChatModel.find().populate("users").exec();
  }

  async findOne(id) {
    const chat = await ChatModel.findById(id).populate("users").exec();
    if (!chat) {
      throw boom.notFound("User not found");
    }
    return chat;
  }

  async create(chat) {
    const newChat = new ChatModel(chat);
    // check if users exist
    const users = await UserModel.find({ _id: { $in: chat.users } }).exec();
    if (users.length !== chat.users.length) {
      throw boom.badRequest("Users do not exist");
    }
    return newChat.save();
  }

  async update(id, changes) {
    const chat = await ChatModel.findById(id).exec();
    if (!chat) {
      throw boom.notFound("Chat not found");
    }
    return ChatModel.findByIdAndUpdate(id, changes, {
      new: true,
    }).exec();
  }

  async delete(id) {
    const chat = await ChatModel.findById(id).exec();
    if (!chat) {
      throw boom.notFound("Chat not found");
    }
    return ChatModel.findByIdAndDelete(id).exec();
  }
}

module.exports = ChatsService;
