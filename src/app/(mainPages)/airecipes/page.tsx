'use client';

import React from 'react';
import CreateRecipeCard from './_components/CreateRecipeCard';

const AiRecipes = () => {
  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold mt-2'>Yapay Zeka İle Tarif Oluşturun</h1>
      <h6 className='text-md font-medium text-gray-500 mt-2'>Aşağıdaki seçenekler ile yapay zeka aracınızı kullanarak yepyeni tarifler oluşturun!</h6>
      <div className='flex justify-between mt-4 gap-4'>
        <CreateRecipeCard title='Bölgeye Göre' description='Sevdiğiniz mutfakları seçin ve yapay zeka sizin için tarif önersin!' ImageSrc={require('@/assets/illustrations/createRecipeCuisine.png')} />
        <CreateRecipeCard title='Malzemeye Göre' description='Elinizde kalan malzemeleri söyleyin, bu malzemeler ile tarif önersin!' ImageSrc={require('@/assets/illustrations/createRecipeIngredient.png')} />
        <CreateRecipeCard title='Öğüne Göre' description='Hangi öğün için yemek yapacağınızı seçmeniz yeterli, gerisini yapay zekaya bırakın!' ImageSrc={require('@/assets/illustrations/createRecipeMeal.png')} />
        <CreateRecipeCard title='Filtreye Göre' description='Birden çok filtre ile daha özelleştirilmiş tarfiler oluşturun!' ImageSrc={require('@/assets/illustrations/createRecipeFilter.png')} />
      </div>
    </div>
  );
};

export default AiRecipes;