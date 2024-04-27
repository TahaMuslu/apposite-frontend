'use client';
import Image from 'next/image';
import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { VscSettings } from 'react-icons/vsc';

const Topbar = () => {
    return (
        <div className='h-full grid grid-cols-12 place-items-center gap-2 py-6'>
            <div className='flex items-center justify-start col-span-4 gap-2 w-full'>
                <Image src={require("@/assets/images/efsanevi.png")} alt="Profile Picture" className="h-14 w-14 rounded-xl bg-red-300 col-span-1" />
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-semibold'>Merhaba &nbsp;<span className='text-red-500'>Mustafa,</span></h1>
                    <p className='text-sm text-gray-400'>Bugün hangi yemeği yapmak istersin?</p>
                </div>
            </div>
            <div className='col-span-7 grid grid-cols-12 gap-2 w-full'>
                <div className='w-full h-14 rounded-lg transition-colors border duration-300 bg-white px-4 col-span-9 col-start-2 hover:border-gray-300 
                    hover:border shadow-lg border-white shadow-gray-300 flex items-center'>
                    <input type='text'
                        placeholder='Tarif Ara...'
                        className='w-full h-full outline-none me-2 transition-colors duration-300' />
                    <CiSearch className='text-3xl text-gray-500 active:text-gray-900 cursor-pointer transition-colors duration-200' />
                </div>
                <button className='h-14 w-14 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 flex justify-center
                 items-center shadow-lg shadow-gray-300 active:bg-red-700 active:duration-100'>
                    <VscSettings className='text-3xl' />
                </button>
            </div>
            <div className='col-span-1'>
                <button className='h-14 w-14 rounded-full bg-white hover:bg-gray-200 transition-colors duration-300 flex justify-center items-center shadow-lg
                 shadow-gray-300 active:bg-gray-300 active:duration-100'>
                    <IoMdNotificationsOutline className='text-3xl text-gray-500' />
                </button>
            </div>
        </div>
    );
};

export default Topbar;