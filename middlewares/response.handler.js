// midleware to handle responses
const responseHandler = (_req, res, next) => {
  res.success = (data, status = 200) => {
    res.status(status).json({
      data,
      error: null,
    });
  };

  res.error = (error, status = 500) => {
    res.status(status).json({
      data: null,
      error,
    });
  };

  next();
};

module.exports = responseHandler;
