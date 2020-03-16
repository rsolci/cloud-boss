const express = require('express');
const path = require('path');
const app = module.exports = require('express')();

// Health check endpoint
app.get('/health', (req, resp) => {
  resp.send({messages: ['Server running']})
})

app.use('/api', require('kafka/KafkaRoutes'))

app.all('/api/*', (req, resp) => {
  resp.status(404).send({messages: []})
})

app.use((err, req, res, next) => {
  res.status(500).send({ error: err })
})

// Front end files
app.use(express.static('public'))
  app.all('*', (req, resp) => {
  resp.sendFile(path.resolve(__dirname, '../public/index.html'));
})