import React from 'react'

import { PageTitle } from 'components/layout'

const Kafka = ({children}) => {
  return (
    <div>
      <PageTitle title="Kafka manager" />
      {children}
    </div>
  )
}
export default Kafka