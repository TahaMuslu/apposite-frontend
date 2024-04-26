'use client';
import Image from 'next/image';
import React from 'react';
import { IconType } from 'react-icons';

interface ListItemProps {
    title: string;
    ImageSrc: string;
}

const ListItem = ({ title, ImageSrc, ...props }: React.HTMLAttributes<HTMLDivElement> & ListItemProps) => {
    return (
        <div className='flex items-center gap-2 flex-col h-full min-w-24'>
            <Image src={ImageSrc} alt='' className='w-24 h-24 object-cover rounded-lg' />
            <div>
                <h1 className='text-sm font-normal'>{title}</h1>
            </div>
        </div>
    );
};

const HorizontalList = ({ title, Icon, Items, ...props }: React.HTMLAttributes<HTMLDivElement> & { title: string, Icon?: IconType, Items: ListItemProps[]; }) => {
    return (
        <div className='w-full' {...props}>
            <div className='w-full flex items-center justify-between py-4'>
                <div className='flex items-center'>
                    <h1 className='text-xl font-semibold'>{title}</h1>
                    {Icon && <Icon className='text-red-500 h-5 w-5 ms-2' />}
                </div>
                <div className='text-sm text-gray-400 cursor-pointer hover:text-gray-500 active:text-gray-800 select-none transition-colors duration-150'>
                    Tümünü Görüntüle
                </div>
            </div>
            <div className='overflow-x-auto flex gap-4 px-4 py-2 scroll-smooth custom-scrollbar'>
                {Items.map((item, index) => <ListItem key={index} {...item} />)}
            </div>
        </div>
    );
};

export default HorizontalList;