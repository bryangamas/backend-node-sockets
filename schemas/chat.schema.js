const Joi = require("joi");

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = Joi.string().min(3).max(30);
const users = Joi.array().items(id.required());

const createChatSchema = Joi.object().keys({
  name: name.required(),
  users: users.required(),
});

module.exports = {
  createChatSchema,
};
