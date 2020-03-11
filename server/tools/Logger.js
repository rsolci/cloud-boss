const winston = require('winston');
const {
  combine,
  printf
} = winston.format;

const logLevel = process.env.LOG_LEVEL || 'info'

const logFormat = printf((params) => {
  return `${params.timestamp} [${params.level}] [${params.service}] | ${params.message}`
});

class Logger {

  constructor(serviceName) {
    this.logger = winston.createLogger({
      level: logLevel,
      format: combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        logFormat
      ),
      defaultMeta: {
        service: serviceName
      },
      transports: [
        new winston.transports.Console()
      ],
    });
  }

  error(message) {
    this.logger.error({
      message: message
    });
  }

  warn(message) {
    this.logger.warn({
      message: message
    });
  }

  info(message) {
    this.logger.info({
      message: message
    });
  }

  debug(message) {
    this.logger.debug({
      message: message
    })
  }

}

const loggers = []

const LoggerFactory = {
  getLogger: (loggerName) => {
    if (!loggers[loggerName]) {
      loggers[loggerName] = new Logger(loggerName)
    } 
    return loggers[loggerName]
  }
}

module.exports = LoggerFactory