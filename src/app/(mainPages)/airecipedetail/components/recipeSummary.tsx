'use client';
import HttpService from '@/services/httpService';
import { TabsProps, Tag } from 'antd';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';

interface RecipeSummaryProps {
    meal: any;
}

const RecipeSummary = ({ meal }: RecipeSummaryProps) => {
    return (
        <div className='w-full'>
            <div className='w-full h-40 overflow-y-hidden rounded-xl relative'>
                <div className='absolute top-12 left-0 '>
                    <h1 className='text-xl font-normal'>{meal?.name}</h1>
                    <br></br>
                    <p className='text-md font-light'>{meal?.description}</p>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-6 mt-8 px-24'>
                <div className='flex flex-col items-center bg-red-100 p-4 rounded-lg'>
                    <span>Süre</span>
                    <span className='text-red-500'>⏰ {meal?.preparationTime} Dakika</span>
                </div>
                <div className='flex flex-col items-center bg-red-100 p-4 rounded-lg'>
                    <span>Kalori</span>
                    <span className='text-red-500'>🔥 {meal?.calories}</span>
                </div>
                {/* <div className='flex flex-col items-center bg-red-100 p-4 rounded-lg'>
                    <span>Bölge</span>
                    <span className='text-red-500 text-nowrap'>🌍 {meal?.cuisinePreference?.name}</span>
                </div> */}
           
            </div>
    
        </div>
    );
};

export default RecipeSummary;