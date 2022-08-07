const validationHandler = require("../../middlewares/validation.handler");

// pagination schema
const Joi = require("joi");

const paginationSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
});

module.exports = () => validationHandler(paginationSchema, "query");
