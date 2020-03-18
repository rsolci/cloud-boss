import React from 'react'
import { KafkaTopicMessages } from 'components/kafka'

const KafkaTopic = ({clientId, topic}) => {
  return (
    <div>
      <KafkaTopicMessages clientId={clientId} topicName={topic} />
    </div>
  )
}

export default KafkaTopic