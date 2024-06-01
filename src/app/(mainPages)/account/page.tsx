'use client';

import { useStore } from '@/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Account = () => {
  const session = useSession();
  const router = useRouter();
  const { logout } = useStore();

  useEffect(() => {
    document.title = "Hesabım";
  }, []);

  return (
    <div className='flex flex-col justify-center items-center p-20'>
      <FaRegUser className="h-20 w-20 rounded-xl text-red-500 col-span-1" />
      <h1 className="text-2xl font-semibold mt-4">{session.data?.user.name}</h1>
      <h1 className="text-md font-light text-gray-400">{session.data?.user.email}</h1>

      <div onClick={() => router.push("/firstlogin")} className="mt-8 cursor-pointer px-1 pt-2 mb-1 w-full rounded-md hover:bg-gray-100 transition-all duration-300">
        <div className="flex justify-between items-center text-gray-500">
          <div className='flex items-center'>
            <IoSettingsOutline className="h-9 w-9" />
            <h1 className="text-lg font-normal ms-3">Kişisel Bilgilerini Düzenle</h1>
          </div>
          <MdKeyboardArrowRight className='w-7 h-7' />
        </div>
        <div className='h-0.5 w-full bg-gray-200 mt-2' />
      </div>

      <div onClick={() => logout()} className="cursor-pointer px-1 pt-2 mb-1 w-full rounded-md hover:bg-gray-100 transition-all duration-300">
        <div className="flex justify-between items-center text-gray-500">
          <div className='flex items-center'>
            <IoIosLogOut className="h-9 w-9" />
            <h1 className="text-lg font-normal ms-3">Çıkış Yap</h1>
          </div>
          <MdKeyboardArrowRight className='w-7 h-7' />
        </div>
        <div className='h-0.5 w-full bg-gray-200 mt-2' />
      </div>
    </div>
  );
};

export default Account;