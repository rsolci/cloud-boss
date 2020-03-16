const app = module.exports = require('express')();
const logger = require('tools/Logger').getLogger("kafka");

const { connect, listTopics } = require('./KafkaService')

app.get('/kafka', async(req, resp) => {
  // const recipes = await listRecipes()
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
