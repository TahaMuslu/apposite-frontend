'use client';
import Image from 'next/image';
import React from 'react';

const CategoryCard = ({ title, ImageSrc }: { title: string, ImageSrc: string; }) => {
    return (
        <div className='flex flex-col bg-white w-20 h-20 shadow-lg gap-1 justify-center items-center m-4 rounded-lg
         cursor-pointer hover:bg-gray-100 transition-colors duration-300 active:bg-gray-200 active:duration-150'>
            <Image src={ImageSrc} alt='' className='object-cover w-10 h-10' />
            <p className='text-xs text-center font-medium text-gray-700'>{title}</p>
        </div>
    );
};

export default CategoryCard;