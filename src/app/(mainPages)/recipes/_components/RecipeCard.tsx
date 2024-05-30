'use client';
import { Tag } from 'antd';
import Image from 'next/image';
import React from 'react';

const RecipeCard = ({ ImageSrc, title, description, calories, preparationTime }: { ImageSrc: string, title: string, description: string, calories: string | number, preparationTime: number; }) => {
    return (
        <div className='w-full h-32 bg-white shadow-lg rounded-xl grid grid-cols-12 cursor-pointer hover:bg-gray-100 active:bg-gray-200 active:duration-150 transition-colors duration-300'>
            <div className='col-span-2 flex justify-center items-center'>
                <Image src={ImageSrc} width={1000} height={1000} alt="Recipe Image" className='w-28 h-24 object-cover rounded-lg' />
            </div>
            <div className='col-span-8 flex flex-col gap-1 p-2 justify-center'>
                <h1 className='text-xl font-semibold'>{title}</h1>
                <p className='text-sm text-gray-400'>{description}</p>
            </div>
            <div className='col-span-2 flex justify-center items-start pt-4'>
                <Tag className='text-md' color='green-inverse' bordered={false}>{calories} kalori</Tag>
                <Tag className='text-md' color='yellow-inverse' bordered={false}>{preparationTime} dakika</Tag>
            </div>
        </div>
    );
};

export default RecipeCard;;