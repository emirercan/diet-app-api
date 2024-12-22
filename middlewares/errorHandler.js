const errorHandler = (err, req, res, next) => {
  if (err.status === 429) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'You have exceeded the request limit. Please wait a while.',
    });
  }

  return res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong.',
  });
};

module.exports = errorHandler;
