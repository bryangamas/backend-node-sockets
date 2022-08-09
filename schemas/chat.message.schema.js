const Joi = require("joi");
const joiObjectId = require("./utils/joiObjectId");

const createMessageSchema = Joi.object().keys({
  message: Joi.string().min(1).max(255).trim().required(),
  user: joiObjectId().required(),
});

module.exports = {
  createMessageSchema,
};
