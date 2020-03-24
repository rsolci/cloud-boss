import React from 'react'

const Sidebar = ({children}) => {
  return (
    <div className='w-64 min-w-56 bg-white shadow'>
      <header >
        Available tools
      </header>
      <div className='w-full py-4 text-gray-900 text-left capitalize'>
        {children}
      </div>
    </div>
  )
}

export default Sidebar;