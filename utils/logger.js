const winston = require('winston');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/' + env);

const logger = new winston.Logger({
    transports: [
        new winston.transports.File(config.LOG.FILE),
        new winston.transports.Console(config.LOG.CONSOLE)
    ],
    exitOnError: config.LOG.EXIT_ON_ERROR
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;
