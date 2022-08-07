function logErrors(err, _req, _res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
}

function boomErrorHandler(err, _req, res, next) {
  if (err.isBoom) {
    const statusCode = err.output.statusCode;
    res.error(
      {
        message: err.output.payload.message,
        statusCode,
      },
      statusCode
    );
  } else {
    next(err);
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(_err, _req, res, _next) {
  const statusCode = 500;
  res.error(
    {
      message: "Internal server error",
      statusCode,
    },
    statusCode
  );
}

function useErrorHandlers(app) {
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(errorHandler);
}

module.exports = useErrorHandlers;
