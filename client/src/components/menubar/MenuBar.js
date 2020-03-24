import React from 'react'

import { MenuItem } from 'components/menubar'

const MenuBar = ({children}) => {
  return (
    <nav>
      <MenuItem to="kafka">Kafka</MenuItem>
    </nav>
  )
}

export default MenuBar;