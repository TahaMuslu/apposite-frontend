"use client";

import Image from 'next/image';
import React from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import HorizontalList from './_components/HorizontalList';
import { FaFire } from 'react-icons/fa';
import CategoryCard from './_components/CategoryCard';



const Home = () => {

  return (
    <div className='w-full'>
      <div className='w-full h-40 overflow-y-hidden rounded-xl relative bg-black'>
        <Image src={require('@/assets/images/food1.png')} alt='' className='object-cover w-full -translate-y-32 opacity-60' />
        <div className='absolute bottom-0 left-0 ps-4 pb-4'>
          <h1 className='text-lg font-normal text-white'>Haftanın Yemeği</h1>
          <p className='text-xs font-light text-white w-80'>Lorem ipsum dolor sit amet consectetur. Risus amet fermentum quis felis.</p>
          <div className='text-gray-400 text-sm flex items-center gap-2 mt-1'>
            <HiOutlineUser /><span className='text-xs'>Mustafa Turgut</span>
          </div>
        </div>
      </div>
      <HorizontalList title='En Çok Beğenilen Tarifler' Icon={FaFire} Items={Array.from({ length: 30 }).map((_, index) => ({ title: 'Yemek Adı', ImageSrc: require('@/assets/images/food1.png') }))} />
      <HorizontalList title='Yeni Tarifleri Keşfedin' Icon={FaFire} Items={Array.from({ length: 30 }).map((_, index) => ({ title: 'Yemek Adı', ImageSrc: require('@/assets/images/food1.png') }))} />
      <h1 className='text-xl font-semibold mt-6'>Kategoriler</h1>
      <div className='flex'>
        <CategoryCard title='Kahvaltı' ImageSrc={require('@/assets/illustrations/breakfastCategory.png')} />
        <CategoryCard title='Öğle' ImageSrc={require('@/assets/illustrations/lunchCategory.png')} />
        <CategoryCard title='Akşam' ImageSrc={require('@/assets/illustrations/dinnerCategory.png')} />
        <CategoryCard title='Tatlı' ImageSrc={require('@/assets/illustrations/dessertCategory.png')} />
      </div>
    </div>
  );
};

export default Home;