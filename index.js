require('module-alias/register');
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

const setupMiddlewares = require('@middlewares');

const errorHandler = require('@middlewares/errorHandler');

const logger = require('@logger');

setupMiddlewares(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});