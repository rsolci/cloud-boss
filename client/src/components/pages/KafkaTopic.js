import React, { useEffect, useState } from 'react'
import { KafkaTopicMessages } from 'components/kafka'

const KafkaTopic = ({clientId, topic}) => {
  const [topicConfigs, setTopicConfigs] = useState([]);

  useEffect(() => {
    fetch(`/api/kafka/${clientId}/topics/${topic}/config`).then((response) => response.json())
    .then((data) => {
      setTopicConfigs(data.data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [clientId, topic])
  return (
    <div className="flex flex-col">
      <div>
        <p>Topic: {topic}</p>
      </div>
      <p>Topic Configuration:</p>
      <div className='bg-white border shadow-inner shadow-sm relative'>
        <div className="fadeout absolute fixed w-full h-4 bottom-0 left-0"/>
        <div className='px-3 py-2 h-48 overflow-y-auto'>
          {topicConfigs.map(topicConfig => <div key={topicConfig.name} className="py-1 text-sm">
              <span className="text-gray-600 px-2">{topicConfig.name}</span>
              <span className="font-mono">{topicConfig.value}</span>
            </div>
          )}
        </div>
      </div>
      <KafkaTopicMessages clientId={clientId} topicName={topic} />
    </div>
  )
}

export default KafkaTopic