import React from 'react'

const TextInput = ({...props}) => {
  return (
    <input type='text' className='border rounded-sm border-solid border-gray-300 p-1' {...props} />
  )
}

export default TextInput