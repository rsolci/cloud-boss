import React from 'react'

const TextArea = ({...props}) => {

  return (
    <textarea className='border rounded-sm border-solid border-gray-300 p-1' {...props}></textarea>
  )
}

export default TextArea