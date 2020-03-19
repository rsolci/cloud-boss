const { v4 } = require('uuid')
const kafka = require('kafka-node')

const logger = require('tools/Logger').getLogger("kafka");

// const consumer = new kafka.Consumer(client, [{topic: 'CasStyleOptionActivationExceptions', partition: 0}], {autoCommit: false})

// consumer.on('message', message => {
//   logger.info(message.value)
// })

const KAFKA_CONNECTIONS = [];

const createClient = (clientId, host, port) => {
  const existingConnection = KAFKA_CONNECTIONS[clientId];
  if (!existingConnection || existingConnection.client) {
    const client = new kafka.KafkaClient({kafkaHost: `${host}:${port}`})
    KAFKA_CONNECTIONS[clientId] = {client:client}
  }
  // TODO handle errors
  return KAFKA_CONNECTIONS[clientId].client
}

const getAdminNode = (clientId) => {
  logger.info(`Getting admin console for clientId ${clientId}`)
  const existingConnection = KAFKA_CONNECTIONS[clientId];
  if (existingConnection && existingConnection.admin) {
    return existingConnection.admin;
  }
  if (existingConnection && existingConnection.client) {
    const admin = new kafka.Admin(existingConnection.client);
    KAFKA_CONNECTIONS[clientId] = {...existingConnection, admin:admin}
  }
  // TODO handle errors
  return KAFKA_CONNECTIONS[clientId].admin
}

const createConsumer = (clientId, topicName) => {
  logger.info(`Creating consumer for clientId: (${clientId}) for topic ${topicName}`)
  const existingConnection = KAFKA_CONNECTIONS[clientId];
  if (!existingConnection || !existingConnection.client) {
    throw new Error('No connection for this clientId')
  }
  const consumer = new kafka.Consumer(existingConnection.client, [
    { topic: topicName, partition: 0}
  ], { autoCommit: false })
  KAFKA_CONNECTIONS[clientId] = {...existingConnection, consumer: consumer}
  return consumer;
}

const createProducer = (clientId) => {
  logger.info(`Creating producer for clientId: (${clientId})`)
  const existingConnection = KAFKA_CONNECTIONS[clientId];
  if (!existingConnection || !existingConnection.client) {
    throw new Error('No connection for this clientId')
  }
  const producer = new kafka.Producer(existingConnection.client)
  KAFKA_CONNECTIONS[clientId] = {...existingConnection, producer: producer}
  return producer;
}

const connect = (host, port) => {
  const clientId = v4();
  logger.info(`Generated id: ${clientId} for conection to ${host}:${port}`)
  createClient(clientId, host, port)
  return clientId;
}

const listTopics = async (clientId) => {
  const admin = getAdminNode(clientId)
  return new Promise((resolve, reject) => {
    admin.listTopics((err, res) => {
      if (err) {
        reject(err)
      } else {
        const metadata = res.filter(responseItem => !!responseItem['metadata'])[0].metadata
        resolve(Object.keys(metadata).filter(key => key !== '__consumer_offsets'))
      }
    });
  })
}

const consume = (clientId, topicName, consumeFunction = () => {}) => {
  const consumer = createConsumer(clientId, topicName);
  consumer.on('message', (message) => {
    consumeFunction(message.value)
  })
}

const produce = (clientId, topicName, message, callback = ()=>{}) => {
  const producer = createProducer(clientId);
  producer.send([
    {
      topic: topicName,
      messages: message
    }
  ], callback)
}

module.exports = { connect, listTopics, consume, produce }