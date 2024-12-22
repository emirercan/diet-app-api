const AppError = require('@exceptions/AppError');
const logger = require('@logger');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!(err instanceof AppError)) {
    logger.error(err);
    statusCode = statusCode || 500;
    message = message || 'Internal Server Error';
  }

  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message,
    },
  });
};

module.exports = errorHandler;
