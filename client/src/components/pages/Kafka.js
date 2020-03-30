import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'

import { LabeledInput } from 'components/inputs'
import { Button } from 'components/buttons'
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