const boom = require("@hapi/boom");
const UserModel = require("../db/models/user.model");

class UserService {
  async find() {
    return UserModel.find().exec();
  }

  async findOne(id) {
    const user = await UserModel.findById(id).exec();
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async create(user) {
    const newUser = new UserModel(user);
    return newUser.save();
  }
}

module.exports = UserService;
