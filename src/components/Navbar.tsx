'use client';
import { useStore } from '@/store';
import { Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { HiOutlineUser } from 'react-icons/hi';
import { IoIosLogOut } from 'react-icons/io';
import { IoChatbubbleOutline, IoFastFoodOutline } from 'react-icons/io5';
import { LuChefHat } from 'react-icons/lu';

const NavbarButton = ({ children, routeHref, NavbarIcon, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { routeHref: string | null, NavbarIcon: IconType; }) => {
  const [curr_style, setCurr_style] = useState<string>('text-[#9ca3af]');
  const { logout } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (window.location.href.split('/')[3] === routeHref?.split('/')[1])
      setCurr_style('text-red-500');
    else
      setCurr_style('text-[#9ca3af]');
  }, [window.location.href]);
  return (
    <button
      onClick={routeHref ? () => router.push(routeHref) : () => logout()}
      {...props}
      className={`h-14 w-14 hover:bg-gray-100 transition-colors duration-300 rounded-lg hover:text-red-500 ${curr_style}`}>
      <NavbarIcon className='mx-auto h-5 w-5' />
      {children}
    </button>
  );
};

const Navbar = () => {

  return (
    <div className='bg-white flex flex-col ms-6 rounded-lg border shadow-xl border-gray-200 shadow-gray-300'>
      <Tooltip title='AromAI' placement='right'>
        <div className='h-14 w-14 text-gray-800 flex justify-center items-center text-xl'>
          A
          <span className='text-red-500'>
            I
          </span>
        </div>
      </Tooltip>
      <div className='w-3/4 bg-gray-400 h-[1px] mx-auto' />
      <Tooltip title='Akış' placement='right'>
        <NavbarButton routeHref='/' NavbarIcon={IoFastFoodOutline} />
      </Tooltip>
      <Tooltip title='Yapay Zeka' placement='right'>
        <NavbarButton routeHref='/airecipes' NavbarIcon={IoChatbubbleOutline} />
      </Tooltip>
      <Tooltip title='Keşfet' placement='right'>
        <NavbarButton routeHref='/explore' NavbarIcon={LuChefHat} />
      </Tooltip>
      <Tooltip title='Hesap' placement='right'>
        <NavbarButton routeHref='/account' NavbarIcon={HiOutlineUser} />
      </Tooltip>
      <Tooltip title='Çıkış Yap' placement='right'>
        <NavbarButton routeHref={null} NavbarIcon={IoIosLogOut} />
      </Tooltip>

    </div>
  );
};

export default Navbar;