const boom = require('@hapi/boom');

const validationHandler = (schema, property) => {
  return (req, _res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      throw boom.badRequest(error.details[0].message);
    }
    next();
  };
};

module.exports = validationHandler;
