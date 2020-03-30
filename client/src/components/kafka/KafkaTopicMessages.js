import React, { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import format from 'date-fns/format'
import { TextInput } from 'components/inputs';
import { Button } from 'components/buttons';
import { Emoji } from 'components/images'

const KafkaTopicMessages = ({clientId, topicName}) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [messageToSend, setMessageToSend] = useState('');

  // TODO fix this url
  // const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(`ws://localhost:5000/api/kafka/${clientId}/topics/${topicName}/watch`);

  const sendMessage = () => {}
  const readyState = ReadyState.OPEN;
  const lastMessage = {data: 'Mock1'}
  useEffect(() => {
    setMessageHistory([
      { timestamp: new Date(), message: {data: 'Mock1'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      { timestamp: new Date(), message: {data: 'Mock2'} },
      {
        timestamp: new Date(),
        message: {data: 'Big message'}
      }
    ])
    // if (lastMessage !== null) {
    //   setMessageHistory(prev => [{timestamp: new Date(), message: lastMessage}, ...prev]);
    // }
  // }, [lastMessage]);
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: <Emoji symbol='0x1F7E1' />,
    [ReadyState.OPEN]: <Emoji symbol='0x1F7E2' />,
    [ReadyState.CLOSING]: <Emoji symbol='0x1F7E0' />,
    [ReadyState.CLOSED]: <Emoji symbol='0x1F534' />,
  }[readyState];

  const socketOpen = readyState === ReadyState.OPEN;

  return (
    <div className='flex flex-col'>
      <div className='h-12'>
        <p>Topic: {topicName}</p>
        <p>Websocket connection: {connectionStatus}</p>
      </div>
      <div className='h-12'>
        {socketOpen && <div>
          <TextInput value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)} />
          <Button onClick={() => sendMessage(messageToSend)}>Send</Button>
        </div>}
      </div>
      <div className='flex-grow'>
        {lastMessage ? <p>Last message: {lastMessage.data}</p> : null}
        <div className='bg-white border shadow-inner shadow-sm relative'>
          <ul className='px-3 py-2 h-64 overflow-y-auto'>
            {messageHistory.map((messageObj, idx) => <li key={idx} className='mb-1'>
              <span className='bg-gray-300 text-xs rounded-sm px-1 mr-1'>{format(messageObj.timestamp, 'HH:mm:SS')}</span>
              <span>{messageObj.message.data}</span>
            </li>)}
          </ul>
          <div className="fadeout absolute fixed w-full h-4 bottom-0 left-0"/>
        </div>
      </div>
    </div>
  )
}

export default KafkaTopicMessages;