'use client'
import Image from 'next/image';
import React from 'react'

const CreateRecipeCard = ({title,description,ImageSrc} : {title: string, description: string, ImageSrc: string}) => {
  return (
    <div className='w-52 h-60 bg-gray-100 flex flex-col justify-center items-center p-4 rounded-xl shadow-lg cursor-pointer
    hover:bg-gray-200 active:bg-gray-300 transition-colors duration-300 active:duration-150 py-2'>
        <Image src={ImageSrc} alt={title} className='w-32 h-32 object-cover select-none' />
        <h6 className='text-xl font-semibold mt-2'>{title}</h6>
        <h6 className='text-xs font-normal text-gray-500 mt-1'>{description}</h6>
    </div>
  )
}

export default CreateRecipeCard