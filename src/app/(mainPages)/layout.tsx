'use client';
import Navbar from '@/app/(mainPages)/_components/Navbar';
import Topbar from '@/app/(mainPages)/_components/Topbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode; }) => {
  const router = useRouter();
  return (
    <div className='grid grid-cols-12 auto-rows-min w-full min-h-screen overflow-x-hidden bg-[#f9fafb]'>
      <div className='row-span-1 col-span-12 grid-cols-12 grid'>
        <div className='col-span-1 place-self-start self-center ms-6 cursor-pointer' onClick={()=>router.push("/")}>
          <Image src={require("@/assets/images/aromai-logo-new.png")} alt="Profile Picture" className="h-14 w-14 rounded-xl" />
        </div>
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
        <div className='col-span-8 h-full overflow-x-hidden pb-4'>
          {children}
        </div>
        <div className='col-span-2' />
      </div>
    </div>
  );
};

export default RootLayout;