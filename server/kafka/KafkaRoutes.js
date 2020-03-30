const app = module.exports = require('express')();
const enableWs = require('express-ws')
enableWs(app)

const logger = require('tools/Logger').getLogger("kafka");

const { connect, listTopics, consume, produce, closeConsumer, getTopicConfig } = require('./KafkaService')

app.get('/kafka', async(req, resp) => {
  resp.send({success: true, data: []})
})

app.post('/kafka/connect', (req, resp) => {
  logger.info("Connecting")
  const clientId = connect(req.body.url, req.body.port)
  resp.send({success: true, data: {clientId: clientId}})
})

app.get('/kafka/:clientId/topics', async(req, resp) => {
  const topics = await listTopics(req.params.clientId)
  resp.send({success: true, data: topics  })
})

app.get('/kafka/:clientId/topics/:topicName/config', async(req, resp) => {
  const clientId = req.params.clientId;
  const topicName = req.params.topicName;
  const topicConfig = await getTopicConfig(clientId, topicName);
  console.info("here")
  resp.send({success: true, data: topicConfig})
})

app.ws('/kafka/:clientId/topics/:topicName/watch', (ws, req) => {
  const clientId = req.params.clientId;
  const topicName = req.params.topicName;
  logger.info(`Client ${clientId} watching messages from topic ${topicName}`)
  const onMessage = (message) => {
    try {
      ws.send(message);
    } catch (error) {
      logger.error('Error while trying to send message to websocket', error)
    }
  }
  ws.on('message', (message) => {
    produce(clientId, topicName, message)
  });
  ws.on('close', () => {
    logger.info('connection closed');
    closeConsumer(clientId, topicName);
  })
  try {
    consume(clientId, topicName, onMessage);
  } catch (error) {
    logger.error(`Received error while consuming message`, error)
  }
})
