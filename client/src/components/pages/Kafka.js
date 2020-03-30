import React from 'react'

import { PageTitle } from 'components/layout'

const Kafka = ({children}) => {
  return (
    <div className="flex flex-col">
      <PageTitle title="Kafka manager" />
      {children}
    </div>
  )
}
export default Kafka