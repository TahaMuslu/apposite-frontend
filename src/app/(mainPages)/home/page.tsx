"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import HorizontalList from './_components/HorizontalList';
import { FaFire } from 'react-icons/fa';
import HttpService from '@/services/httpService';
import { AxiosResponse } from '@/services/types';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';



const Home = () => {
  const [mealOfTheWeek, setMealOfTheWeek] = useState<any>(null);
  const [mostLikedRecipes, setMostLikedRecipes] = useState<any[]>([]);
  const [newRecipes, setNewRecipes] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    document.title = "Ana Sayfa";
  }, []);

  useEffect(() => {

    HttpService.get('recipe/get?PageSize=1&Page=4').then((response: AxiosResponse) => {
      setMealOfTheWeek(response.data?.data?.[0]);
    }).catch((res) => {
      console.log(res);
    });

    HttpService.get('recipe/get?PageSize=30').then((response: AxiosResponse) => {
      setMostLikedRecipes(response.data?.data);
    }).catch((res) => {
      console.log(res);
    });

    HttpService.get('recipe/get?PageSize=30&Page=2').then((response: AxiosResponse) => {
      setNewRecipes(response.data?.data);
    }).catch((res) => {
      console.log(res);
    });



  }, []);

  return (
    <div className='w-full'>
      <div onClick={()=> router.push("/recipedetail/"+mealOfTheWeek.id)} className='w-full h-40 overflow-y-hidden rounded-xl relative bg-black cursor-pointer'>
        <Image src={mealOfTheWeek?.imageUrl} width={1000} priority height={1000} alt='' className='object-cover w-full -translate-y-32 opacity-60' />
        <div className='absolute bottom-0 left-0 ps-4 pb-4'>
          <h1 className='text-lg font-normal text-white'>Haftanın Yemeği - {mealOfTheWeek?.title}</h1>
          <p className='text-xs font-light text-white w-80'>{mealOfTheWeek?.description}</p>
          <div className='text-gray-400 text-sm flex items-center gap-2 mt-1'>
            <HiOutlineUser /><span className='text-xs'>{mealOfTheWeek?.user.name + " " + mealOfTheWeek?.user.surname}</span>
          </div>
        </div>
      </div>
      <HorizontalList title='En Çok Beğenilen Tarifler' Icon={FaFire} Items={mostLikedRecipes.map((item, index) => ({ title: item.title, ImageSrc: item.imageUrl, id: item.id }))} />
      <HorizontalList title='Yeni Tarifleri Keşfedin' Icon={FaFire} Items={newRecipes.map((item, index) => ({ title: item.title, ImageSrc: item.imageUrl, id: item.id }))} />
      {/* <h1 className='text-xl font-semibold mt-6'>Kategoriler</h1>
      <div className='flex'>
        <CategoryCard title='Kahvaltı' ImageSrc={require('@/assets/illustrations/breakfastCategory.png')} />
        <CategoryCard title='Öğle' ImageSrc={require('@/assets/illustrations/lunchCategory.png')} />
        <CategoryCard title='Akşam' ImageSrc={require('@/assets/illustrations/dinnerCategory.png')} />
        <CategoryCard title='Tatlı' ImageSrc={require('@/assets/illustrations/dessertCategory.png')} />
      </div> */}
    </div>
  );
};

export default Home;