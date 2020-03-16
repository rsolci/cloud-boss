import React from 'react'
import { TextInput } from 'components/inputs'

const Kafka = () => {
  return (
    <div>
      <TextInput placeholder="kafka host" />
      <TextInput placeholder="kafka port" />
    </div>
  )
}
export default Kafka