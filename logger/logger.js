const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', //'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'application.log' })
  ],
});


module.exports = logger;