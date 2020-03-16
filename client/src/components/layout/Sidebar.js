import React from 'react'

const Sidebar = ({children}) => {
  return (
    <nav className='w-64 min-w-56'>
      <header >
        Available tools
      </header>
      <div className='w-full py-4 px-2 text-gray-900 bg-white rounded-sm text-left capitalize shadow'>
        {children}
      </div>
    </nav>
  )
}

export default Sidebar;