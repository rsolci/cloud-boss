const app = module.exports = require('express')();
const enableWs = require('express-ws')
enableWs(app)

const logger = require('tools/Logger').getLogger("kafka");

const { connect, listTopics, consume } = require('./KafkaService')

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

app.ws('/kafka/:clientId/topics/:topicName/watch', (ws, req) => {
  const clientId = req.params.clientId;
  const topicName = req.params.topicName;
  logger.info(`Client ${clientId} watching messages from topic ${topicName}`)
  const onMessage = (message) => {
    ws.send(message);
  }
  consume(clientId, topicName, onMessage);
})
