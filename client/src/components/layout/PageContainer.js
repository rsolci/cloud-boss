import React from 'react'

const PageContainer = ({children}) => {
  return (
    <main className='px-5 py-5 flex-grow h-full max-h-full overflow-y-auto flex flex-col'>
      {children}
    </main>
  )
}

export default PageContainer;