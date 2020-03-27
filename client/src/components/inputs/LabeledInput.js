import React from 'react'

const LabeledInput = ({...props}) => {
  return (
    <span className='flex flex-col my-3 w-48'>
      <label className='text-sm'>{props.label}</label>
      <input type='text' className='border rounded-sm border-solid border-gray-300 p-1' {...props} />
    </span>
  )
}

export default LabeledInput;