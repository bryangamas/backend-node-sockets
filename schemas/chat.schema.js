const Joi = require("joi");
const joiObjectId = require("./utils/joiObjectId");

const id = joiObjectId();
const name = Joi.string().min(3).max(30);
const users = Joi.array().items(joiObjectId().required());

const createChatSchema = Joi.object().keys({
  name: name.required(),
  users: users.required(),
});

const getChatSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createChatSchema,
  getChatSchema,
};
