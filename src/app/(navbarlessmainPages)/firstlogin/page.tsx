'use client';

import HttpService from '@/services/httpService';
import { AxiosResponse } from '@/services/types';
import { Button, Select, SelectProps, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface IOption {
    value: number;
    label: string;
}

const FirstLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [options, setOptions] = useState<Array<IOption>>([]);

    const myCarousel = useRef<HTMLDivElement>(null);

    const debounced = useDebouncedCallback(
        (value) => {
            handleSearch(value);
        },
        1000
    );

    useEffect(() => {
        handleSearch('');
    }, []);


    const handleSearch = (value: string) => {
        setLoading(true);
        let url = `Ingredient/get?searchText=${value}`;
        if (value === '')
            url = 'Ingredient/get';
        HttpService.get(url).then((res: AxiosResponse) => {
            if (res.data) {
                setOptions([]);
                res.data.data.forEach((ingredient: any) => {
                    setOptions((prev) => [...prev, { value: ingredient.id, label: ingredient.name }]);
                });
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleChange = (value: string[]) => {
        setSelectedIngredients(value);
        console.log(value);
    };

    return (
        <div ref={myCarousel} className='h-full min-w-full w-max -translate-x-0 transition-transform ease-in-out duration-500 flex'>
            <div className='w-screen h-screen bg-red-100 grid grid-cols-12 grid-rows-12'>
                <div className='row-start-3 col-start-3 row-span-8 col-span-8 bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] shadow-gray-400 rounded-3xl grid-rows-12 grid grid-cols-1 place-content-stretch'>
                    <div className='row-span-2 grid grid-cols-2 place-content-between'>
                        <div className='ms-6 mt-4 flex gap-3'>
                            <div className='w-8 h-8 rounded-full border-red-300 border-2 flex justify-center items-center text-red-300 select-none'>
                                1
                            </div>
                            <div className='w-8 h-8 rounded-full border-gray-300 border-2 flex justify-center items-center text-gray-300 select-none'>
                                2
                            </div>
                            <div className='w-8 h-8 rounded-full border-gray-300 border-2 flex justify-center items-center text-gray-300 select-none'>
                                3
                            </div>
                        </div>
                        <div className='place-self-end me-6 text-red-500 hover:text-red-600 cursor-pointer'>
                            Adımı Geç
                        </div>
                    </div>
                    <div className='row-span-2'>
                        <h2 className='text-2xl font-semibold text-start ms-4'>
                            Herhangi bir malzemeye veya ürüne alerjiniz var mı?
                        </h2>
                        <h6 className='text-sm text-start ms-4 text-gray-400 mt-1'>
                            Yediğinizde size zarar verebilecek malzemeleri olabildiğince sizden uzak tutmaya çalışıyoruz, lütfen aşağıdaki bölümden bu malzemeleri seçiniz.
                        </h6>
                    </div>
                    <div className='row-span-6 flex flex-col justify-start items-center'>
                        <Select
                            mode="multiple"
                            allowClear
                            className='w-11/12'
                            placeholder="Malzeme Ara"
                            onChange={handleChange}
                            onSearch={(value) => debounced(value)}
                            options={options}
                            onFocus={() => debounced('')}
                            notFoundContent={loading ? <Spin size='small' /> : 'Sonuç Bulunamadı'}
                        />
                    </div>
                    <div className='row-span-2 flex justify-center items-start'>
                        <Button type='primary' className='mt-4 bg-red-500 hover:bg-red-600 w-11/12 h-10' onClick={() => {
                            myCarousel.current?.classList.remove('-translate-x-0');
                            myCarousel.current?.classList.add('-translate-x-1/3');
                        }}>Sonraki Adım</Button>
                    </div>

                </div>
            </div>
            <div className='w-screen h-screen bg-red-100 grid grid-cols-12 grid-rows-12'>
                <div className='row-start-3 col-start-3 row-span-8 col-span-8 bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] shadow-gray-400 rounded-3xl grid-rows-12 grid grid-cols-1 place-content-stretch'>
                    <div className='row-span-2 grid grid-cols-2 place-content-between'>
                        <div className='ms-6 mt-4 flex gap-3'>
                            <div className='w-8 h-8 rounded-full border-gray-300 border-2 flex justify-center items-center text-gray-300 select-none'>
                                1
                            </div>
                            <div className='w-8 h-8 rounded-full border-red-300 border-2 flex justify-center items-center text-red-300 select-none'>
                                2
                            </div>
                            <div className='w-8 h-8 rounded-full border-gray-300 border-2 flex justify-center items-center text-gray-300 select-none'>
                                3
                            </div>
                        </div>
                        <div className='place-self-end me-6 text-red-500 hover:text-red-600 cursor-pointer'>
                            Adımı Geç
                        </div>
                    </div>
                    <div className='row-span-2'>
                        <h2 className='text-2xl font-semibold text-start ms-4'>
                            Herhangi bir malzemeye veya ürüne alerjiniz var mı?
                        </h2>
                        <h6 className='text-sm text-start ms-4 text-gray-400 mt-1'>
                            Yediğinizde size zarar verebilecek malzemeleri olabildiğince sizden uzak tutmaya çalışıyoruz, lütfen aşağıdaki bölümden bu malzemeleri seçiniz.
                        </h6>
                    </div>
                    <div className='row-span-6 flex flex-col justify-start items-center'>
                        <Select
                            mode="multiple"
                            allowClear
                            className='w-11/12'
                            placeholder="Malzeme Ara"
                            onChange={handleChange}
                            onSearch={(value) => debounced(value)}
                            options={options}
                            onFocus={() => debounced('')}
                            notFoundContent={loading ? <Spin size='small' /> : 'Sonuç Bulunamadı'}
                        />
                    </div>
                    <div className='row-span-2 flex justify-center items-start'>
                        <Button type='primary' className='mt-4 bg-red-500 hover:bg-red-600 w-11/12 h-10' onClick={() => {
                            myCarousel.current?.classList.remove('-translate-x-1/3');
                            myCarousel.current?.classList.add('-translate-x-2/3');
                        }}>Sonraki Adım</Button>
                    </div>

                </div>
            </div>
            <div className='w-screen h-screen bg-red-100 grid grid-cols-12 grid-rows-12'>
                <div className='row-start-3 col-start-3 row-span-8 col-span-8 bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] shadow-gray-400 rounded-3xl grid-rows-12 grid grid-cols-1 place-content-stretch'>
                    <div className='row-span-2 grid grid-cols-2 place-content-between'>
                        <div className='ms-6 mt-4 flex gap-3'>
                            <div className='w-8 h-8 rounded-full border-gray-300 border-2 flex justify-center items-center text-gray-300 select-none'>
                                1
                            </div>
                            <div className='w-8 h-8 rounded-full border-gray-300 border-2 flex justify-center items-center text-gray-300 select-none'>
                                2
                            </div>
                            <div className='w-8 h-8 rounded-full border-red-300 border-2 flex justify-center items-center text-red-300 select-none'>
                                3
                            </div>
                        </div>
                        <div className='place-self-end me-6 text-red-500 hover:text-red-600 cursor-pointer'>
                            Adımı Geç
                        </div>
                    </div>
                    <div className='row-span-2'>
                        <h2 className='text-2xl font-semibold text-start ms-4'>
                            Herhangi bir malzemeye veya ürüne alerjiniz var mı?
                        </h2>
                        <h6 className='text-sm text-start ms-4 text-gray-400 mt-1'>
                            Yediğinizde size zarar verebilecek malzemeleri olabildiğince sizden uzak tutmaya çalışıyoruz, lütfen aşağıdaki bölümden bu malzemeleri seçiniz.
                        </h6>
                    </div>
                    <div className='row-span-6 flex flex-col justify-start items-center'>
                        <Select
                            mode="multiple"
                            allowClear
                            className='w-11/12'
                            placeholder="Malzeme Ara"
                            onChange={handleChange}
                            onSearch={(value) => debounced(value)}
                            options={options}
                            onFocus={() => debounced('')}
                            notFoundContent={loading ? <Spin size='small' /> : 'Sonuç Bulunamadı'}
                        />
                    </div>
                    <div className='row-span-2 flex justify-center items-start'>
                        <Button type='primary' className='mt-4 bg-red-500 hover:bg-red-600 w-11/12 h-10' onClick={() => {
                            myCarousel.current?.classList.remove('-translate-x-2/3');
                            myCarousel.current?.classList.add('-translate-x-0');
                        }}>Sonraki Adım</Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FirstLogin;