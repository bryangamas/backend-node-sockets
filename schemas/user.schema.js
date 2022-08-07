const Joi = require("joi");
const joiObjectId = require("./utils/joiObjectId");

const id = joiObjectId();
const name = Joi.string().min(3).max(30);

const createUserSchema = Joi.object().keys({
  name: name.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  getUserSchema,
};
