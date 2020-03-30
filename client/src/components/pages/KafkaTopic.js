import React, { useEffect } from 'react'
import { KafkaTopicMessages } from 'components/kafka'

const KafkaTopic = ({clientId, topic}) => {
  useEffect(() => {
    fetch(`/api/kafka/${clientId}/topics/${topic}/config`).then((response) => response.json())
    .then((data) => {
      console.info(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [clientId, topic])
  return (
    <div className="flex flex-col">
      <KafkaTopicMessages clientId={clientId} topicName={topic} />
    </div>
  )
}

export default KafkaTopic