import React from 'react'

const MyHeading = ({title, description}) => {
  return (
    <div className='flex flex-col items-center'>
      <p className='text-4xl font-bold text-center'>{title}</p>
      <p className='text-lg text-center max-w-[60ch]'>{description}</p>
    </div>
  )
}

export default MyHeading
