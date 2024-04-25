'use client';
import Navbar from '@/components/Navbar';
import { useStore } from '@/store';
import { Button } from 'antd';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode; }) => {
  const { logout } = useStore();
  return (
    <div className='grid grid-cols-12 grid-rows-1 w-full min-h-screen overflow-x-hidden bg-[#f9fafb]'>
      <div className='col-span-1 bg-transparent'>
        <div className='fixed top-1/2 -translate-y-1/2'>
          <Navbar />
        </div>
      </div>
      <div className='col-span-11 h-full'>
        {children}
      </div>
    </div>
  );
};

export default RootLayout;