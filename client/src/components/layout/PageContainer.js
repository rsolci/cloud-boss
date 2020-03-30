import React from 'react'

const PageContainer = ({children}) => {
  return (
    <main className='px-5 py-5 flex-grow overflow-y-auto flex flex-col h-full overflow-hidden'>
      {children}
    </main>
  )
}

export default PageContainer;