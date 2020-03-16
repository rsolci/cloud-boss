const express = require('express');
const bodyParser = require('body-parser');
require('app-module-path/register');
require('dotenv').config();

const logger = require('tools/Logger').getLogger("server");

const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const requestLogger = (req, resp, next) => {
  logger.info(`[${req.method}] -> ${req.path}`)
  next()
}

app.use(requestLogger)

// Standard HTTP APIs
app.use(require('routes/routes'))

app.on('ready', function () {
  app.listen(port, () => logger.info(`Listening on port ${port}`));
});

app.on('initerror', function () {
  logger.error('Error while starting up application')
  process.exit(1);
});

(async () => {
  try {
    app.emit('ready');
  } catch {
    app.emit('initerror')
  }
})()