const { v4 } = require('uuid')
const kafka = require('kafka-node')

const logger = require('tools/Logger').getLogger("kafka");

const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'})
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

module.exports = { connect, listTopics }