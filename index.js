require('module-alias/register');
require('dotenv').config();

const express = require('express');
const app = express();
const startServer = require('@config/startServer');

const setupMiddlewares = require('@middlewares');

const routes = require('@routes');
const errorHandler = require('@middlewares/errorHandler');

setupMiddlewares(app);

app.use('/api', routes);

app.use(errorHandler);

startServer(app);

