'use client';
import Navbar from '@/components/Navbar';
import Topbar from '@/components/Topbar';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className='grid grid-cols-12 grid-rows-12 w-full min-h-screen overflow-x-hidden bg-[#f9fafb]'>
      <div className='row-span-1 col-span-12 grid-cols-12 grid'>
        <div className='col-span-8 col-start-3'>
          <Topbar />
        </div>
      </div>
      <div className='row-span-11 col-span-12 grid grid-cols-12 grid-rows-1'>
        <div className='col-span-2 bg-transparent'>
          <div className='fixed top-1/2 -translate-y-1/2'>
            <Navbar />
          </div>
        </div>
        <div className='col-span-8 h-full overflow-x-hidden'>
          {children}
        </div>
        <div className='col-span-2' />
      </div>
    </div>
  );
};

export default RootLayout;