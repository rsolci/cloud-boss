import React from 'react'

const PageContainer = ({children}) => {
  return (
    <main className='container px-5 py-5'>
      {children}
    </main>
  )
}

export default PageContainer;