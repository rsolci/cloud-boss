import React from 'react'

const PageContainer = ({children}) => {
  return (
    <main className='container'>
      {children}
    </main>
  )
}

export default PageContainer;