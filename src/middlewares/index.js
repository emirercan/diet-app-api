const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
});

const setupMiddlewares = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

module.exports = setupMiddlewares;