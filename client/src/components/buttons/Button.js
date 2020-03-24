import React from 'react'

const Button = ({children, ...props}) => {
  return (
    <button className="bg-gray-300 hover:bg-gray-400 focus:bg-gray-200 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center" {...props}>
      <span>{children}</span>
    </button>
  )
}

export default Button