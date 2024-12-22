const connectDB = require('@config/connectDB');
const logger = require('@config/logger');

const port = process.env.PORT || 3000;

const startServer = async (app) => {
  try {
    await connectDB();

    app.listen(port, () => {
      logger.info(`App listening on port ${port}`);
    });
  } catch (error) {
    logger.error(`Error starting the server: ${error.message}`);
    process.exit(1);
  }
};

module.exports = startServer;
