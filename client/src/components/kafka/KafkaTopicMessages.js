import React, { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { TextInput } from 'components/inputs';
import { Button } from 'components/buttons';

const KafkaTopicMessages = ({clientId, topicName}) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [messageToSend, setMessageToSend] = useState('');
  const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(`ws://localhost:5000/api/kafka/${clientId}/topics/${topicName}/watch`);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => [lastMessage, ...prev]);
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
  }[readyState];

  const socketOpen = readyState === ReadyState.OPEN;

  return (
    <div>
      <p>The WebSocket is currently {connectionStatus}</p>
      {socketOpen && <div>
        <TextInput value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)} />
        <Button onClick={() => sendMessage(messageToSend)}>Send</Button>
      </div>}
      {lastMessage ? <p>Last message: {lastMessage.data}</p> : null}
      <ul>
        {messageHistory.map((message, idx) => <li key={idx}>{message.data}</li>)}
      </ul>
    </div>
  )
}

export default KafkaTopicMessages;