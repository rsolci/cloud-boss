import React from 'react'

import { Link, Match } from "@reach/router";

const MenuItem = ({children, to, icon}) => {
  return (
    <Match path={to}>
      {({match}) => {
        const activeClass = match ? 'border-r-4 border-gray-400' : ''
        return (
        <Link to={to}>
          <span className={`${activeClass} cursor-pointer px-2 py-1 hover:bg-gray-200 hover:text-gray-700 block mb-5`}>
            {icon &&
              <i className="w-8 fas fa-stream p-2 bg-gray-200 rounded-full">
              </i>
            }
            <span className='mx-2 text-sm'>
              {children}
            </span>
          </span>
        </Link>
      )}}
    </Match>
  )
}

export default MenuItem;