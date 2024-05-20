'use client';
import PrimaryButton from '@/components/PrimaryButton';
import HttpService from '@/services/httpService';
import { AxiosResponse } from '@/services/types';
import { useStore } from '@/store';
import { Button, Input, Select, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { LuImagePlus } from 'react-icons/lu';
import { useDebouncedCallback } from 'use-debounce';

interface IOption {
    value: number;
    label: string;
}

interface IRecipeStep {
    description: string;
    stepNumber: number;
}

interface IRecipeIngredient {
    ingredientId: string;
    quantityType: string;
    quantity: number;
}

interface IRecipe {
    coverPhotoId: string,
    title: string,
    description: string,
    preparationTime: number,
    calories: number,
    cuisinePreferenceId: string,
    recipeSteps: IRecipeStep[],
    recipeIngredients: IRecipeIngredient[];
}

const CreateRecipe = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);
    const [selectedCuisine, setSelectedCuisine] = useState<any[]>([]);
    const [optionsCuisine, setOptionsCuisine] = useState<Array<IOption>>([]);
    const [optionsIngredient, setOptionsIngredient] = useState<Array<IOption>>([]);
    const [ingredientFetchLoading, setIngredientFetchLoading] = useState<boolean>(false);
    const [cuisineFetchLoading, setCuisineFetchLoading] = useState<boolean>(false);
    const [recipeImage, setRecipeImage] = useState<File | undefined | null>();
    const [recipe, setRecipe] = useState<IRecipe>({} as IRecipe);
    const [recipeUploadLoading, setRecipeUploadLoading] = useState<boolean>(false);

    const { showNotification } = useStore();

    const myCarousel = useRef<HTMLDivElement>(null);

    const route = useRouter();

    const debouncedIngredient = useDebouncedCallback(
        (value) => {
            handleSearchIngredient(value);
        },
        1000
    );

    const debouncedCuisine = useDebouncedCallback(
        (value) => {
            handleSearchCuisine(value);
        },
        1000
    );

    const uploadImage = () => {
        const input = document.getElementById('recipeImageInput') as HTMLInputElement;
        input.click();
    };

    const firstForward = () => {
        myCarousel.current?.classList.remove('-translate-x-0');
        myCarousel.current?.classList.add('-translate-x-1/2');
    };

    const secondBackward = () => {
        myCarousel.current?.classList.remove('-translate-x-1/2');
        myCarousel.current?.classList.add('-translate-x-0');
    };

    const createRecipe = () => {
        setRecipeUploadLoading(true);
        let form = new FormData();
        form.append('File', recipeImage as Blob);
        form.append('MediaName', recipeImage?.name as string);
        form.append('FileType', 'RecipeImage');

        HttpService.post('MediaFile/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(async (res: AxiosResponse) => {
            if (res.data?.data) {
                setRecipe({ ...recipe, coverPhotoId: res.data.data?.id });
                await HttpService.post('Recipe/create', { ...recipe, coverPhotoId: res.data.data?.id }).then((res: AxiosResponse) => {
                    if (res.status.toString().startsWith('2')) {
                        showNotification({ type: 'success', message: 'Tarif başarıyla oluşturuldu' });
                        route.replace('/myrecipes');
                    }
                });
            }
        }).catch((err) => {
            showNotification({ type: 'error', message: 'Bir hata oluştu' });
        }).finally(() => {
            setRecipeUploadLoading(false);
        });
    };

    const handleChangeIngredients = (value: any[]) => {
        setSelectedIngredients(value);
        setRecipe({ ...recipe, recipeIngredients: value.map((ingredient) => ({ ingredientId: ingredient, quantityType: '', quantity: 0 })) });
    };

    const handleChangeCuisine = (value: any[]) => {
        setSelectedCuisine([value[value.length - 1]]);
        setRecipe({ ...recipe, cuisinePreferenceId: value[value.length - 1]});
    };

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
            setIngredientFetchLoading(false);
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
            setCuisineFetchLoading(false);
        });
    };

    return (
        <div ref={myCarousel} className='h-full min-w-full w-[200%] -translate-x-0 transition-transform ease-in-out duration-0 flex'>
            <div className='w-full flex flex-col gap-8'>
                <div className='grid grid-cols-12 w-full gap-4'>
                    <PrimaryButton className='col-span-1 my-auto' w={12} h={12} onClick={() => route.replace('/myrecipes')}><FaArrowLeft className='text-2xl' /></PrimaryButton>
                    <h1 className='text-3xl font-bold col-span-3 text-nowrap place-self-center'>Yeni Tarif Oluştur</h1>
                    <div className='col-span-7'></div>
                    <PrimaryButton className='col-span-1 my-auto ms-auto' w={12} h={12} onClick={firstForward}><FaArrowRight className='text-2xl' /></PrimaryButton>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 justify-center items-center'>
                            <div className='w-10 h-10 rounded-full border-red-500 border-2 flex flex-col justify-center items-center text-white select-none bg-red-500'>
                                <span>1</span>
                            </div>
                            <span className='text-sm text-red-500'>Temel Bilgiler</span>
                        </div>
                        <div className='w-32 h-0.5 my-auto bg-gray-300 select-none' />
                        <div className='flex flex-col gap-1 justify-center items-center'>
                            <div className='w-10 h-10 rounded-full border-gray-300 border-2 flex flex-col justify-center items-center text-gray-400 select-none'>
                                <span>2</span>
                            </div>
                            <span className='text-sm text-gray-400'>Yapılış Aşamları</span>
                        </div>
                    </div>
                </div>
                <div className='w-full grid grid-cols-2 gap-8 pb-8'>
                    <div className='col-span-1 flex flex-col gap-4'>
                        <p className='text-lg font-bold'>Kapak Fotoğrafı</p>
                        <div onClick={uploadImage} className='w-full h-60 bg-gray-200 border-dashed border border-black rounded-lg flex flex-col gap-2 justify-center items-center cursor-pointer'>
                            {recipeImage
                                ?
                                <Image src={URL.createObjectURL(recipeImage)} width={1000} height={1000} alt='' className='w-full h-full object-cover rounded-lg' />
                                :
                                <><LuImagePlus className='text-8xl text-red-500' />
                                    <p className='text-2xl font-semibold text-black'>Kapak Resmi Yükle</p>
                                    <p className='text-sm font-semibold text-gray-500 mx-12 text-center'>
                                        Yüklediğin kapak resmi diğer kullanıcılar tarafından ilk görülen resim olacak
                                    </p>
                                </>
                            }
                        </div>
                        <input id='recipeImageInput' type='file' className='hidden' accept='image/*' onChange={(e) => setRecipeImage(e.target.files?.item(0))} />
                        <p className='text-lg font-bold'>Malzemeler</p>
                        <Select
                            mode="multiple"
                            allowClear
                            className='w-full h-11'
                            placeholder="Malzeme Ara"
                            onChange={handleChangeIngredients}
                            onSearch={(value) => { setOptionsIngredient([]); setIngredientFetchLoading(true); debouncedIngredient(value); }}
                            options={optionsIngredient}
                            loading={ingredientFetchLoading}
                            filterOption={false}
                            onFocus={() => { setOptionsIngredient([]); setIngredientFetchLoading(true); debouncedIngredient(''); }}
                            notFoundContent={ingredientFetchLoading ? <Spin className='w-full flex justify-center' size='small' /> : 'Sonuç Bulunamadı'}
                        />
                    </div>
                    <div className='col-span-1'>
                        <p className='text-lg font-bold'>Genel Bilgiler</p>
                        <p className='text-md text-gray-500 my-2'>Tarif Adı</p>
                        <Input className='w-full h-12 border border-gray-300 rounded-lg px-4' onChange={(e) => setRecipe({ ...recipe, title: e.target.value })} />
                        <p className='text-md text-gray-500 my-2'>Tarif Açıklaması</p>
                        <Input.TextArea className='w-full h-36 border border-gray-300 rounded-lg px-4' onChange={(e) => setRecipe({ ...recipe, description: e.target.value })} />
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='col-span-1'>
                                <p className='text-md text-gray-500 my-2'>Hazırlık Süresi (dk)</p>
                                <Input type='number' min={0} className='w-full h-12 border border-gray-300 rounded-lg px-4' onChange={(e) => setRecipe({ ...recipe, preparationTime: parseInt(e.target.value) })} />
                            </div>
                            <div className='col-span-1'>
                                <p className='text-md text-gray-500 my-2'>Kalori</p>
                                <Input type='number' min={0} className='w-full h-12 border border-gray-300 rounded-lg px-4' onChange={(e) => setRecipe({ ...recipe, calories: parseInt(e.target.value) })} />
                            </div>
                            <div className='col-span-1'>
                                <p className='text-md text-gray-500 my-2'>Mutfak Tercihi</p>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    className='w-11/12 h-12'
                                    placeholder="Mutfak Ara"
                                    onChange={handleChangeCuisine}
                                    onSearch={(value) => { setOptionsCuisine([]); setCuisineFetchLoading(true); debouncedCuisine(value); }}
                                    options={optionsCuisine}
                                    value={selectedCuisine}
                                    onDeselect={() => setSelectedCuisine([])}
                                    onFocus={() => { setOptionsCuisine([]); setCuisineFetchLoading(true); debouncedCuisine(''); }}
                                    filterOption={false}
                                    notFoundContent={cuisineFetchLoading ? <Spin className='w-full flex justify-center' size='small' /> : 'Sonuç Bulunamadı'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full grid grid-cols-3 gap-12'>
                    {recipe.recipeIngredients?.map((ingredient, index) => (
                        <div key={index} className='w-full flex flex-col gap-2'>
                            <p className='text-xl font-bold'>{optionsIngredient.find(ing => ing.value.toString() === ingredient.ingredientId)?.label}</p>
                            <div className='flex gap-2'>
                                <div className='w-1/2 flex flex-col gap-2 justify-center'>
                                    <p className='text-lg text-gray-500 my-2'>Miktar</p>
                                    <p className='text-lg text-gray-500 my-2'>Miktar Türü</p>
                                </div>
                                <div className='w-1/2 flex flex-col gap-2 justify-center'>
                                    <Input className='h-12' type='number' placeholder='Örn. 5' min={0} onChange={(e) => {
                                        let newIngredients = [...recipe.recipeIngredients];
                                        newIngredients[index].quantity = parseInt(e.target.value);
                                        setRecipe({ ...recipe, recipeIngredients: newIngredients });
                                    }} />
                                    <Input className='h-12' placeholder='Örn. Kaşık' onChange={(e) => {
                                        let newIngredients = [...recipe.recipeIngredients];
                                        newIngredients[index].quantityType = e.target.value;
                                        setRecipe({ ...recipe, recipeIngredients: newIngredients });
                                    }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full flex flex-col gap-8'>
                <div className='grid grid-cols-12 w-full gap-4'>
                    <PrimaryButton className='col-span-1 my-auto' w={12} h={12} onClick={secondBackward}><FaArrowLeft className='text-2xl' /></PrimaryButton>
                    <h1 className='text-3xl font-bold col-span-3 text-nowrap place-self-center'>Yeni Tarif Oluştur</h1>
                    <div className='col-span-6'></div>
                    <PrimaryButton className='col-span-2 my-auto ms-auto' w={12} h={12} loading={recipeUploadLoading} onClick={createRecipe}>Tarif Oluştur</PrimaryButton>
                </div>
                <div className='w-full flex justify-center items-end'>
                    <div className='ms-6 mt-4 flex gap-2'>
                        <div className='flex flex-col gap-1 justify-center items-center'>
                            <div className='w-10 h-10 rounded-full border-gray-300 border-2 flex flex-col justify-center items-center text-gray-400 select-none'>
                                <span>1</span>
                            </div>
                            <span className='text-sm text-gray-400'>Temel Bilgiler</span>
                        </div>
                        <div className='w-32 h-0.5 my-auto bg-gray-300 select-none' />
                        <div className='flex flex-col gap-1 justify-center items-center'>
                            <div className='w-10 h-10 rounded-full border-red-500 border-2 flex flex-col justify-center items-center text-white select-none bg-red-500'>
                                <span>2</span>
                            </div>
                            <span className='text-sm text-red-500'>Yapılış Aşamları</span>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <p className='text-xl font-bold'>Yapılış Aşamaları</p>
                    <Button type='link' className='w-min h-10 text-red-500 rounded-lg font-semibold text-lg' onClick={() => setRecipe({ ...recipe, recipeSteps: [...(recipe.recipeSteps ?? []), { description: '', stepNumber: (recipe.recipeSteps ?? []).length + 1 }] })}>
                        + Ekle
                    </Button>
                </div>
                <div className='w-full grid grid-cols-1 gap-4'>
                    {recipe.recipeSteps?.map((step, index) => (
                        <div key={index} className='w-full flex gap-4'>
                            <div className='w-10 h-10 rounded-full border-red-300 border-2 flex flex-col justify-center items-center text-red-400 select-none'>
                                <span>{step.stepNumber}</span>
                            </div>
                            <Input.TextArea className='w-full h-36 border border-gray-300 rounded-lg px-4' onChange={(e) => {
                                let newSteps = [...recipe.recipeSteps];
                                newSteps[index].description = e.target.value;
                                setRecipe({ ...recipe, recipeSteps: newSteps });
                            }} />
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default CreateRecipe;