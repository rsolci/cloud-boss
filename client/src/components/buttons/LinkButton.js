import React from 'react'

import { Link } from "@reach/router";

const LinkButton = ({children, to, icon}) => {
  return (
    <Link to={to}>
    <span className="cursor-pointer px-2 py-1 hover:bg-gray-200 hover:text-gray-700 rounded-sm block mb-5">
      {icon &&
        <i className="w-8 fas fa-stream p-2 bg-gray-200 rounded-full">
        </i>
      }
      <span className='mx-2 text-sm'>
        {children}
      </span>
    </span>
    </Link>
  )
}

export default LinkButton