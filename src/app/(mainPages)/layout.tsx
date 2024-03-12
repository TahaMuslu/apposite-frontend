
import React from 'react'

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex h-screen w-screen'>
        <div className='w-96'>
            SideBar
        </div>

        <div className='flex-1 bg-gray-100'>
            {children}
        </div>
    </div>
  )
}

export default RootLayout