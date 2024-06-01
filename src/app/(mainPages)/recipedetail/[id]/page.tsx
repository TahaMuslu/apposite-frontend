'use client';
import HttpService from '@/services/httpService';
import { TabsProps, Tag, Spin } from 'antd';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import RecipeSummary from '../components/recipeSummary';
import RecipeSteps from '../components/recipeSteps';
import { HiOutlineUser } from 'react-icons/hi';
import RecipeIngredients from '../components/recipeIngredients';

const RecipeDetail = () => {
    const params = useParams();
    const [meal, setMeal] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    const items: TabsProps['items'] = [
        {
            // add some css to this
            key: '1',
            label: 'Özet',
            children: <RecipeSummary meal={meal} />,

        },
        {
            key: '2',
            label: 'Malzemeler',
            children: <RecipeIngredients meal={meal} />,
        },
        {
            key: '3',
            label: 'Yapılışı',
            children: <RecipeSteps meal={meal} />,
        },
    ];

    useEffect(() => {
        setLoading(true);
        HttpService.get(`Recipe/getById/${params.id}`).then((response: AxiosResponse) => {
            setMeal(response.data.data);
            setLoading(false);
        }).catch((res) => {
            setLoading(false);
        })
    }, [params.id]);



    return (
        <>
            {
                loading ? (
                    <div className='w-full flex justify-center items-center h-screen'>
                        <Spin size='large' />
                    </div>
                ) : (
                    <div className='w-full'>
                        <div className='w-full h-40 overflow-y-hidden rounded-xl relative bg-black'>
                            <Image src={meal?.imageUrl} width={1000} priority height={1000} alt='' className='object-cover w-full -translate-y-32 opacity-60' />
                            <div className='absolute bottom-0 left-0 ps-4 pb-4'>
                                <h1 className='text-lg font-normal text-white'>{meal?.title}</h1>
                                {/* <p className='text-xs font-light text-white w-80'>{meal?.description}</p> */}
                                <div className='text-white text-sm flex items-center gap-2 mt-1'>
                                    <HiOutlineUser /><span className='text-xs'>{meal?.user.name + " " + meal?.user.surname}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-center items-center mt-5'>
                            <Tabs
                                centered
                                items={items}
                                size='large'
                                className='w-full'
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default RecipeDetail;
