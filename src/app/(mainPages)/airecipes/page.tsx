'use client';

import React, { useEffect, useState } from 'react';
import CreateRecipeCard from './_components/CreateRecipeCard';
import { Checkbox, Drawer, Modal, Select } from 'antd';
import PrimaryButton from '@/components/PrimaryButton';
import HttpService from '@/services/httpService';
import { AxiosResponse } from '@/services/types';
import AiRecipeCard from './_components/AiRecipeCard';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/navigation';

const AiRecipes = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [aiRecipes, setAiRecipes] = useState<any>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string[]>([]);
  const [selectedIncludedIngredient, setSelectedIncludedIngredient] = useState<string[]>([]);
  const [selectedExcludedIngredient, setSelectedExcludedIngredient] = useState<string[]>([]);
  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);
  const [currFilter, setCurrFilter] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);


  const router = useRouter();

  useEffect(() => {
    document.title = "Yapay Zeka Tarifi";
  }, []);


  const handleChangeCuisine = (value: string[]) => {
    setSelectedCuisine([value[value.length - 1]]);
  };

  const handleChangeMeal = (value: string[]) => {
    setSelectedMeal([value[value.length - 1]]);
  };

  const handleChangeIncludedIngredient = (value: string[]) => {
    setSelectedIncludedIngredient(value);
  };

  const handleChangeExcludedIngredient = (value: string[]) => {
    setSelectedExcludedIngredient(value);
  };

  const handleChangeHealth = (value: string[]) => {
    setSelectedHealth(value);
  };

  useEffect(() => {
    if (loading) return;
    HttpService.get('Ai/getAiRecipes?PageSize=10&Page=1').then((res: AxiosResponse) => {
      setAiRecipes(res.data?.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [loading]);

  const changeMyInfo = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      HttpService.get('User/getPersonalInfo').then((res: AxiosResponse) => {
        if(currFilter === 1 || currFilter === 4)
          setSelectedCuisine(res.data?.data?.cuisines?.map((cuisine: any) => cuisine.name))
        if(currFilter === 2 || currFilter === 4)
          setSelectedExcludedIngredient(res.data?.data?.ingredients?.map((ingredient: any) => ingredient.name));

        setSelectedHealth(res.data?.data?.healths?.map((health: any) => health.name));
      }).catch((err) => {
        console.log(err);
      });
    } else {
      if(currFilter === 1 || currFilter === 4)
        setSelectedCuisine([]);
      if(currFilter === 2 || currFilter === 4)
        setSelectedExcludedIngredient([]);
      setSelectedHealth([]);
    }
  };


  const handleCreateAiRecipe = () => {
    setLoading(true);
    HttpService.post('Ai/createAiRecipe', {
      cuisine: selectedCuisine[0],
      mealType: selectedMeal[0],
      includedIngredients: selectedIncludedIngredient,
      excludedIngredients: selectedExcludedIngredient,
      health: selectedHealth,
      language: "Turkish"
    }).then((res: AxiosResponse) => {
      // setAiRecipe(res.data?.data);
      setSelectedCuisine([]);
      setSelectedMeal([]);
      setSelectedIncludedIngredient([]);
      setSelectedExcludedIngredient([]);
      setSelectedHealth([]);
      setOpenFilter(false);
      router.push('/airecipedetail/'+res.data?.data?.id)
      // setIsModalOpen(true);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  };





  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold mt-2'>Yapay Zeka İle Tarif Oluşturun</h1>
      <h6 className='text-md font-medium text-gray-500 mt-2'>Aşağıdaki seçenekler ile yapay zeka aracınızı kullanarak yepyeni tarifler oluşturun!</h6>
      <div className='flex justify-between mt-4 gap-4'>
        <CreateRecipeCard onClick={() => {setCurrFilter(1);setOpenFilter(true);}} title='Bölgeye Göre' description='Sevdiğiniz mutfakları seçin ve yapay zeka sizin için tarif önersin!' ImageSrc={require('@/assets/illustrations/createRecipeCuisine.png')} />
        <CreateRecipeCard onClick={() => {setCurrFilter(2);setOpenFilter(true);}} title='Malzemeye Göre' description='Elinizde kalan malzemeleri söyleyin, bu malzemeler ile tarif önersin!' ImageSrc={require('@/assets/illustrations/createRecipeIngredient.png')} />
        <CreateRecipeCard onClick={() => {setCurrFilter(3);setOpenFilter(true);}} title='Öğüne Göre' description='Hangi öğün için yemek yapacağınızı seçmeniz yeterli, gerisini yapay zekaya bırakın!' ImageSrc={require('@/assets/illustrations/createRecipeMeal.png')} />
        <CreateRecipeCard onClick={() => {setCurrFilter(4);setOpenFilter(true);}} title='Filtreye Göre' description='Birden çok filtre ile daha özelleştirilmiş tarfiler oluşturun!' ImageSrc={require('@/assets/illustrations/createRecipeFilter.png')} />
      </div>
      <h1 className='text-3xl font-bold mt-10'>Yapay Zeka İle Oluşturulan Tarifler</h1>
      <div className='flex flex-col gap-6 mt-4 overflow-y-auto custom-scrollbar pb-4'>
        {aiRecipes?.map((aiRecipe: any, index: number) => (
          <AiRecipeCard key={index} ImageSrc={require("@/assets/images/food1.png")} aiRecipe={aiRecipe} />
        ))
        }

      </div>

      <Drawer
        title="Yapay Zeka Tarif Filtresi"
        open={openFilter}
        className='pb-4'
        onClose={() => setOpenFilter(false)}
      >
        <h6 className='text-md font-medium text-gray-800 mt-2'>Aşağıdaki seçenekler ile yapay zeka aracını kullanarak yepyeni tarifler oluşturun!</h6>

      <Checkbox onChange={e => changeMyInfo(e)} className='mt-4'>Kendi kişisel bilgilerimi kullan</Checkbox>
        {(currFilter === 1 || currFilter === 4) 
        &&
        <>
        <p className='text-lg font-semibold text-black mt-8'>Mutfak Seçin</p>
        <Select
          mode="tags"
          allowClear
          className='w-11/12'
          placeholder="Örn. Türk, İtalyan, Çin"
          value={selectedCuisine}
          onChange={handleChangeCuisine}
          filterOption={false}
          notFoundContent={null}
        />
        </>
        }

        {(currFilter === 3 || currFilter === 4)
          &&
          <>
            <p className='text-lg font-semibold text-black mt-8'>Öğün Seçin</p>
            <Select
              mode="tags"
              allowClear
              className='w-11/12'
              placeholder="Örn. Kahvaltı, Öğle, Akşam"
              value={selectedMeal}
              onChange={handleChangeMeal}
              filterOption={false}
              notFoundContent={null}
            />
          </>
        }

        {(currFilter === 2 || currFilter === 4) 
        &&
          <>
            <p className='text-lg font-semibold text-black mt-8'>İçinde olması gereken malzemeleri Seçin</p>
            <Select
              mode="tags"
              allowClear
              className='w-11/12'
              placeholder="Örn. Patates, Soğan, Domates"
              onChange={handleChangeIncludedIngredient}
              value={selectedIncludedIngredient}
              filterOption={false}
              notFoundContent={null}
            />

            <p className='text-lg font-semibold text-black mt-8'>İçinde olmaması gereken malzemeleri Seçin</p>
            <Select
              mode="tags"
              allowClear
              className='w-11/12'
              placeholder="Örn. Patates, Soğan, Domates"
              onChange={handleChangeExcludedIngredient}
              value={selectedExcludedIngredient}
              filterOption={false}
              notFoundContent={null}
            />
          </>
        }
        <p className='text-lg font-semibold text-black mt-8'>Özel Sağlık Durumunu Seçin (varsa)</p>
        <Select
          mode="tags"
          allowClear
          className='w-11/12 mb-8'
          placeholder="Örn. Diyabet, Kolestrol"
          onChange={handleChangeHealth}
          value={selectedHealth}
          filterOption={false}
          notFoundContent={null}
        />

        <PrimaryButton loading={loading} onClick={handleCreateAiRecipe}>Tarif Oluştur</PrimaryButton>

      </Drawer>
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

export default AiRecipes;