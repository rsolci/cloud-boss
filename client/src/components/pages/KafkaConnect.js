import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'

import { LabeledInput } from 'components/inputs'
import { Button } from 'components/buttons'
import { PageTitle } from 'components/layout'

const KafkaConnect = () => {
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
      <LabeledInput label='Kafka Host' name='kafka-host' placeholder='127.0.0.1' value={host} onChange={(e) => setHost(e.target.value)}/>
      <LabeledInput label='Kafka Port' name='kafka-port' placeholder='9092' value={port} onChange={(e) => setPort(e.target.value)}/>
      <Button onClick={connect}>Connect</Button>
      {clientId &&
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Topics
                </th>
                </tr>
              </thead>
              <tbody>
                {topics.map(topic => 
                  <tr key={topic}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link to={`/kafka/${clientId}/topics/${topic}`}>
                      {topic}
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      }
      <div>
        
      </div>
    </div>
  )
}
export default KafkaConnect