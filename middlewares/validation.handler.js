const boom = require("@hapi/boom");

const validationHandler = (schema, property) => {
  return (req, _res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      throw boom.badRequest(error.message);
    }
    next();
  };
};

module.exports = validationHandler;
