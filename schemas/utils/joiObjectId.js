const Joi = require("joi");

function joiObjectId() {
  return Joi.string().regex(/^[0-9a-fA-F]{24}$/, "valid object id");
}

module.exports = joiObjectId;
