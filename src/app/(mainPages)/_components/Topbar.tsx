'use client';
import PrimaryButton from '@/components/PrimaryButton';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { VscSettings } from 'react-icons/vsc';

const Topbar = () => {
    const session = useSession();
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/recipes?searchText=${searchText}`);
    };

    return (
        <div className='h-full grid grid-cols-12 place-items-center gap-2 py-6'>
            <div className='flex items-center justify-start col-span-4 gap-2 w-full'>
                {/* <Image src={require("@/assets/images/efsanevi.png")} alt="Profile Picture" className="h-14 w-14 rounded-xl bg-red-300 col-span-1" /> */}
                <FaRegUser onClick={()=>router.push("/account")} className="h-12 w-12 rounded-xl col-span-1 text-red-500 cursor-pointer"/>
                {/* <Image src={require("@/assets/images/efsanevi.png")} alt="Profile Picture" className="h-14 w-14 rounded-xl col-span-1" /> */}
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-semibold'>Merhaba&nbsp;<span className='text-red-500'>{session.data?.user.name}</span></h1>
                    <p className='text-sm text-gray-400'>Bugün hangi yemeği yapmak istersin?</p>
                </div>
            </div>
            <div className='col-span-8 grid grid-cols-12 gap-2 w-full'>
                <div className='w-full h-14 rounded-lg transition-colors border duration-300 bg-white px-4 col-span-11 col-start-2 hover:border-gray-300 
                    hover:border shadow-lg border-white shadow-gray-300 flex items-center'>
                    <input type='text'
                        placeholder='Tarif Ara...'
                        className='w-full h-full outline-none me-2 transition-colors duration-300'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <CiSearch onClick={handleSearch} className='text-3xl text-gray-500 active:text-gray-900 cursor-pointer transition-colors duration-200' />
                </div>
                {/* <div className='col-span-2 place-self-end'>
                <PrimaryButton h={14} w={14}>
                    <VscSettings className='text-3xl' />
                </PrimaryButton>
                </div> */}
            </div>
        </div>
    );
};

export default Topbar;