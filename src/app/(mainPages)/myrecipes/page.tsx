'use client';

import PrimaryButton from '@/components/PrimaryButton';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import RecipeCard from './_components/RecipeCard';
import { useRouter } from 'next/navigation';
import HttpService from '@/services/httpService';
import { useStore } from '@/store';
import { AxiosResponse } from '@/services/types';

const Explore = () => {
  const [recipes, setRecipes] = useState<any>([]);
  const router = useRouter();

  const { showNotification } = useStore();

  useEffect(() => {
    document.title = "Tariflerim";
  }, []);

  useEffect(() => {
    HttpService.get('Recipe/getMyRecipes?Page=1&PageSize=10').then((res: AxiosResponse) => {
      if (res.status === 200) {
        setRecipes(res.data?.data);
      } else {
        showNotification({ message: res.data?.messages?.join(', ') ?? "", type: 'error' });
      }
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold mt-2'>Tariflerim</h1>
        <PrimaryButton onClick={() => router.push("/createrecipe")} w={12} h={12}><FaPlus className='text-2xl' /></PrimaryButton>
      </div>
      <div className='flex flex-col gap-6 mt-4 overflow-y-auto custom-scrollbar pb-4'>
        {recipes.map((recipe:any, index:number) => (
          <RecipeCard key={index} Id={`${recipe.id}`} ImageSrc={recipe.imageUrl} title={recipe.title} description={recipe.description} calories={recipe.calories} preparationTime={recipe.preparationTime} />
        ))}
        {/* <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} /> */}

      </div>
    </div >
  );
};

export default Explore;