import React, { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

const KafkaTopicMessages = ({clientId, topicName}) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(`wss://localhost:5000/api/kafka/${clientId}/topics/${topicName}/watch`);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
  }[readyState];

  return (
    <div>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => <span key={idx}>{message.data}</span>)}
      </ul>
    </div>
  )
}

export default KafkaTopicMessages;