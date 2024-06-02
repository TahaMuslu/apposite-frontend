'use client';

import HttpService from '@/services/httpService';
import { Checkbox, TabsProps, Tag, Tabs } from 'antd';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface RecipeIngredientsProps {
    meal: any;
}

const RecipeIngredients = ({ meal }: RecipeIngredientsProps) => {
    const [ingredients, setIngredients] = useState<any[]>([]);

    useEffect(() => {
        if (meal?.aiIngredients) {
            const formattedIngredients = meal.aiIngredients.map((ingredient: any) => ({
                name: ingredient.name,
                quantity: ingredient.quantity,
                quantityType: ingredient.quantityType,
                checked: false,
            }));
            setIngredients(formattedIngredients);
        }
    }, [meal]);

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].checked = checked;
        setIngredients(updatedIngredients);
    };

    return (
        <div className="w-full">
            {ingredients.length > 0 && (
                <div className="w-full h-40 overflow-y-hidden rounded-xl relative">
                    <h2 className="text-lg font-bold mb-4">
                        Malzemeler <span className="text-red-500">({ingredients.length})</span>
                    </h2>
                    <ul className="list-none p-0 m-0">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className={`flex items-center justify-between py-2 ${ingredient.checked ? 'line-through text-gray-500' : ''}`}>
                                <Checkbox
                                    checked={ingredient.checked}
                                    className="mr-2"
                                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                />
                                <span className="flex-1">{ingredient.name}</span>
                                <div className="flex space-x-2">
                                    <span className="flex-1">{ingredient.quantity}</span>
                                    <span className="font-bold">{ingredient.quantityType}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipeIngredients;
