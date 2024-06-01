'use client';
import HttpService from '@/services/httpService';
import { TabsProps, Tag } from 'antd';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';

interface RecipeStepsProps {
    meal: any;
}

const RecipeSteps = ({ meal }: RecipeStepsProps) => {
    return (
        <div className='w-full'>
            {
                meal?.recipeSteps.map((step: any, index: number) => (
                    <div key={index} className='flex gap-4 mt-4'>
                        <div className='flex items-center justify-center w-10 h-10 bg-red-100 rounded-full'>
                            <span>{index + 1}</span>
                        </div>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <span className='text-sm'>{step.description}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default RecipeSteps;