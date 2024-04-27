'use client';

import PrimaryButton from '@/components/PrimaryButton';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import RecipeCard from './_components/RecipeCard';

const Explore = () => {
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold mt-2'>Tariflerim</h1>
        <PrimaryButton><FaPlus className='text-2xl' /></PrimaryButton>
      </div>
      <div className='flex flex-col gap-6 mt-4 overflow-y-auto custom-scrollbar pb-4'>
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />
        <RecipeCard ImageSrc={require('@/assets/images/food1.png')} title='Lorem ipsum dolor' description='Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla. Lorem ipsum dolor sit amet consectetur. Fermentum lacus at euismod eu urna cursus dui condimentum nulla.' difficulty='Kolay' preparationTime={30} />

      </div>
    </div >
  );
};

export default Explore;