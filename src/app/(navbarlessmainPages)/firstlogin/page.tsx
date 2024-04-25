'use client';

import HttpService from '@/services/httpService';
import { AxiosResponse } from '@/services/types';
import { useStore } from '@/store';
import { Button, Select, SelectProps, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface IOption {
    value: number;
    label: string;
}

const FirstLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [finalLoading, setFinalLoading] = useState<boolean>(false);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [selectedHealths, setSelectedHealths] = useState<string[]>([]);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [optionsIngredient, setOptionsIngredient] = useState<Array<IOption>>([]);
    const [optionsHealth, setOptionsHealth] = useState<Array<IOption>>([]);
    const [optionsCuisine, setOptionsCuisine] = useState<Array<IOption>>([]);

    const router = useRouter();

    const { showNotification } = useStore();

    const myCarousel = useRef<HTMLDivElement>(null);

    const debouncedIngredient = useDebouncedCallback(
        (value) => {
            handleSearchIngredient(value);
        },
        1000
    );

    const debouncedHealth = useDebouncedCallback(
        (value) => {
            handleSearchHealth(value);
        },
        1000
    );

    const debouncedCuisine = useDebouncedCallback(
        (value) => {
            handleSearchCuisine(value);
        },
        1000
    );

    const ingredientConfirm = () => {
        myCarousel.current?.classList.remove('-translate-x-0');
        myCarousel.current?.classList.add('-translate-x-1/3');
    };

    const healthBack = () => {
        myCarousel.current?.classList.remove('-translate-x-1/3');
        myCarousel.current?.classList.add('-translate-x-0');
    };

    const healthConfirm = () => {
        myCarousel.current?.classList.remove('-translate-x-1/3');
        myCarousel.current?.classList.add('-translate-x-2/3');
    };

    const cuisineBack = () => {
        if (finalLoading) return;
        myCarousel.current?.classList.remove('-translate-x-2/3');
        myCarousel.current?.classList.add('-translate-x-1/3');
    };

    const cuisineConfirm = () => {
        if (finalLoading) return;
        if (selectedIngredients.length === 0 && selectedHealths.length === 0 && selectedCuisines.length === 0) {
            showNotification({ type: 'error', message: 'Lütfen en az 1 bilgi ekleyiniz.' });
            return;
        }
        const data = {
            ingredients: selectedIngredients,
            healths: selectedHealths,
            cuisines: selectedCuisines
        };
        setFinalLoading(true);

        HttpService.post('User/addPersonalInfo', data).then((res: AxiosResponse) => {
            if (res.status.toString().startsWith('2')) {
                showNotification({ type: 'success', message: 'Kişisel bilgileriniz başarıyla kaydedildi.' });
                router.push('/');
            }
        }).catch((err) => {
            showNotification({ type: 'error', message: 'Kişisel bilgileriniz kaydedilirken bir hata oluştu.' });
        }).finally(() => {
            setFinalLoading(false);
        });
    };

    useEffect(() => {
        handleSearchIngredient('');
    }, []);


    const handleSearchIngredient = (value: string) => {
        let url = `Ingredient/get?searchText=${value}`;
        if (value === '')
            url = 'Ingredient/get';
        HttpService.get(url).then((res: AxiosResponse) => {
            if (res.data?.data) {
                setOptionsIngredient([]);
                res.data.data.forEach((ingredient: any) => setOptionsIngredient((prev) => [...prev, { value: ingredient.id, label: ingredient.name }]));
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleSearchHealth = (value: string) => {
        let url = `Health/get?searchText=${value}`;
        if (value === '')
            url = 'Health/get';
        HttpService.get(url).then((res: AxiosResponse) => {
            if (res.data?.data) {
                setOptionsHealth([]);
                res.data.data.forEach((health: any) => setOptionsHealth((prev) => [...prev, { value: health.id, label: health.name }]));
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleSearchCuisine = (value: string) => {
        let url = `CuisinePreference/get?searchText=${value}`;
        if (value === '')
            url = 'CuisinePreference/get';
        HttpService.get(url).then((res: AxiosResponse) => {
            if (res.data?.data) {
                setOptionsCuisine([]);
                res.data.data.forEach((cuisine: any) => setOptionsCuisine((prev) => [...prev, { value: cuisine.id, label: cuisine.name }]));
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleChangeIngredient = (value: string[]) => {
        setSelectedIngredients(value);
        console.log(value);
    };

    const handleChangeHealth = (value: string[]) => {
        setSelectedHealths(value);
        console.log(value);
    };

    const handleChangeCuisine = (value: string[]) => {
        setSelectedCuisines(value);
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
                        <div className='place-self-end me-6 text-red-500 hover:text-red-600 cursor-pointer' onClick={ingredientConfirm}>
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
                            onChange={handleChangeIngredient}
                            onSearch={(value) => { setOptionsIngredient([]); setLoading(true); debouncedIngredient(value); }}
                            options={optionsIngredient}
                            loading={loading}
                            filterOption={false}
                            onFocus={() => { setOptionsIngredient([]); setLoading(true); debouncedIngredient(''); }}
                            notFoundContent={loading ? <Spin className='w-full flex justify-center' size='small' /> : 'Sonuç Bulunamadı'}
                        />
                    </div>
                    <div className='row-span-2 flex justify-center items-start'>
                        <Button type='primary' className='mt-4 bg-red-500 hover:bg-red-600 w-11/12 h-10' onClick={ingredientConfirm}>Sonraki Adım</Button>
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
                        </div>
                    </div>
                    <div className='row-span-2'>
                        <h2 className='text-2xl font-semibold text-start ms-4'>
                            Uygulamanız gereken bir diyet veya yeme alışkanlığı var mı?
                        </h2>
                        <h6 className='text-sm text-start ms-4 text-gray-400 mt-1'>
                            Bir rahatsızlığınız varsa veya yemek alışkanlığınız varsa lütfen aşağıdaki bölümden bunları seçiniz.
                        </h6>
                    </div>
                    <div className='row-span-6 flex flex-col justify-start items-center'>
                        <Select
                            mode="multiple"
                            allowClear
                            className='w-11/12'
                            placeholder="Diyet Ara"
                            onChange={handleChangeHealth}
                            onSearch={(value) => { setOptionsHealth([]); setLoading(true); debouncedHealth(value); }}
                            options={optionsHealth}
                            onFocus={() => { setOptionsHealth([]); setLoading(true); debouncedHealth(''); }}
                            filterOption={false}
                            notFoundContent={loading ? <Spin className='w-full flex justify-center' size='small' /> : 'Sonuç Bulunamadı'}
                        />
                    </div>
                    <div className='row-span-2 grid grid-cols-2 gap-4 place-items-center'>
                        <Button type='primary' className='col-span-1 bg-red-500 hover:bg-red-600 w-11/12 h-10' onClick={healthBack}>Önceki Adım</Button>
                        <Button type='primary' className='col-span-1 bg-red-500 hover:bg-red-600 w-11/12 h-10' onClick={healthConfirm}>Sonraki Adım</Button>
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
                        </div>
                    </div>
                    <div className='row-span-2'>
                        <h2 className='text-2xl font-semibold text-start ms-4'>
                            Sevdiğiniz ülke mutfakları nelerdir?
                        </h2>
                        <h6 className='text-sm text-start ms-4 text-gray-400 mt-1'>
                            İşaretlediğiniz mutfaklara göre öneriler alacaksınız, lütfen aşağıdaki bölümlerden sevdiğiniz mutfakları seçiniz.
                        </h6>
                    </div>
                    <div className='row-span-6 flex flex-col justify-start items-center'>
                        <Select
                            mode="multiple"
                            allowClear
                            className='w-11/12'
                            placeholder="Mutfak Ara"
                            onChange={handleChangeCuisine}
                            onSearch={(value) => { setOptionsCuisine([]); setLoading(true); debouncedCuisine(value); }}
                            options={optionsCuisine}
                            onFocus={() => { setOptionsCuisine([]); setLoading(true); debouncedCuisine(''); }}
                            filterOption={false}
                            notFoundContent={loading ? <Spin className='w-full flex justify-center' size='small' /> : 'Sonuç Bulunamadı'}
                        />
                    </div>
                    <div className='row-span-2 grid grid-cols-2 gap-4 place-items-center'>
                        <Button type='primary' loading={finalLoading} className='col-span-1 bg-red-500 hover:bg-red-600 w-11/12 h-10' onClick={cuisineBack}>Önceki Adım</Button>
                        <Button type='primary' loading={finalLoading} className='col-span-1 bg-red-500 hover:bg-red-600 w-11/12 h-10' onClick={cuisineConfirm}>Tamamla</Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FirstLogin;