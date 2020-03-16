import React, { useState, useEffect } from 'react'
import { TextInput } from 'components/inputs'
import { Button } from 'components/buttons'

const Kafka = () => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [clientId, setClientId] = useState('');
  const [topics, setTopics] = useState([]);

  const connect = () => {
    fetch("/api/kafka/connect", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url:host, port:port}),
    }).then((response) => response.json())
    .then((data) => {
      setClientId(data.data.clientId)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    if (!clientId) return;
    fetch(`/api/kafka/${clientId}/topics`).then((response) => response.json())
    .then((data) => {
      setTopics(data.data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [clientId])

  return (
    <div>
      <TextInput placeholder="kafka host" value={host} onChange={(e) => setHost(e.target.value)}/>
      <TextInput placeholder="kafka port" value={port} onChange={(e) => setPort(e.target.value)}/>
      <Button onClick={connect}>Connect</Button>
      {clientId && <p>{clientId}</p>}
      <div>
        {topics.map(topic => <p key={topic}>{topic}</p>)}
      </div>
    </div>
  )
}
export default Kafka