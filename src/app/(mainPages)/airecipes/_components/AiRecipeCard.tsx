'use client';
import { Tag } from 'antd';
import Image from 'next/image';
import React from 'react';

const AiRecipeCard = ({ ImageSrc, aiRecipe }: { ImageSrc: string, aiRecipe: any; }) => {
    return (
        <div className='w-full h-32 bg-white shadow-lg rounded-xl grid grid-cols-12 cursor-pointer hover:bg-gray-100 active:bg-gray-200 active:duration-150 transition-colors duration-300'>
            <div className='col-span-2 flex justify-center items-center'>
                <Image src={ImageSrc} alt="Recipe Image" className='w-28 h-24 object-cover rounded-lg' />
            </div>
            <div className='col-span-8 flex flex-col gap-1 p-2 justify-center'>
                <h1 className='text-xl font-semibold'>{aiRecipe.name}</h1>
                <p className='text-sm text-gray-400'>{aiRecipe.description}</p>
            </div>
            <div className='col-span-2 flex justify-start items-start content-start pt-4 flex-wrap gap-y-2'>
                <Tag className='text-md' color='red-inverse' bordered={false}>{aiRecipe.servings} kişilik</Tag>
                <Tag className='text-md' color='yellow-inverse' bordered={false}>{aiRecipe.preparationTime} dakika</Tag>
                <Tag className='text-md' color='green-inverse' bordered={false}>{aiRecipe.calories} Kalori</Tag>
            </div>
            {/* <Modal title="Oluşturulan Tarif" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <p className='text-2xl font-bold mb-4'>{aiRecipe.name}</p>
        <p className='text-lg'>{aiRecipe.description}</p>
        <p className='text-md mt-4'>Hazırlama süresi: {aiRecipe.preparationTime} dk</p>
        <p className='text-md mt-4'>{aiRecipe.servings} kişilik</p>
        <p className='text-md mt-4'>{aiRecipe.calories} kalori (1 porsiyon için)</p>
        <p className='text-md mt-4'>{aiRecipe.protein} gr protein (1 porsiyon için)</p>
        <p className='text-md mt-4'>{aiRecipe.fat} gr yağ (1 porsiyon için)</p>
        <p className='text-md mt-4'>{aiRecipe.carbohydrates} gr karbonhidrat (1 porsiyon için)</p>
        <p className='text-md mt-4'>İçindeki Malzemeler: </p>
        <ul>
          {aiRecipe?.aiIngredients?.map((ingredient: any, index: number) => (
            <li className='mt-4' key={index}><span className='font-semibold'>{ingredient.quantity} {ingredient.quantityType} {ingredient.name}</span> ({ingredient.description}) - {ingredient.calories} kalori - {ingredient.protein} gr protein (100gr başına)  - {ingredient.fat} gr yağ (100gr başına) - {ingredient.carbohydrates} gr karbonhidrat (100gr başına)</li>
          ))}
        </ul>

        <p className='text-md mt-4'>Yapılışı: </p>
        <ul>
          {aiRecipe?.aiInstructions?.map((step: any, index: number) => (
            <li className='mt-2' key={index}>{step.stepNumber} - {step.description}</li>
          ))}
        </ul>

      </Modal> */}
        </div>
    );
};

export default AiRecipeCard;;