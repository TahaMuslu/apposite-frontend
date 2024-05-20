'use client';
import React from 'react';

const EmptyLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className='h-screen w-screen overflow-x-hidden'>
      {children}
    </div>
  );
};

export default EmptyLayout;