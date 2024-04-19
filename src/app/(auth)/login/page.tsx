"use client";

import { useStore } from '@/store';
import { Button } from 'antd';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Input } from 'antd';

const Login = () => {

  const { login } = useStore();

  const searchParams = useSearchParams();

  const from = searchParams.get('from');

  return (
    // <div className='flex justify-center items-center w-full h-screen'>
    //   <Button onClick={() => {
    //     login({
    //       callbackUrl: from || "/",
    //       requestData: {
    //         email: "admin@admin.com",
    //         password: "P@ssw0rd"
    //       },
    //     });
    //   }} type='primary' danger>Giriş Yap</Button>
    // </div>
    <div className='grid grid-cols-2 h-screen w-full'>
      <div className='grid grid-cols-1 place-content-center place-items-center'>
        <div>
          <p className='text-2xl'>Tekrar Hoşgeldin</p>
          <p className='text-md text-gray-500'>Lütfen devam etmek için giriş yap</p>
          <div className='mt-4'>
            <label
              htmlFor="email"
              className='block text-sm font-medium text-gray-500'
            >
              Email
            </label>
            <Input
              id='email'
              className='w-full'
              placeholder='Lütfen email adresinizi giriniz'
              size='large'
            />
          </div>
          <div className='mt-4'>
            <label
              htmlFor="password"
              className='block text-sm font-medium text-gray-500'
            >
              Şifre
            </label>
            <Input
              id='password'
              className='w-full'
              placeholder='Lütfen şifrenizi giriniz'
              size='large'
            />
          </div>
          <p className='text-sm text-gray-500'>Şifremi Unuttum</p>
          <Button
            onClick={() => {
              login({
                callbackUrl: from || "/",
                requestData: {
                  email: "",
                  password: ""
                },
              });
            }
            }
            type='primary'
            danger
            className='mt-4'
          >
            Giriş Yap
          </Button>

          <p className='text-sm text-gray-500'>Hesabınız yok mu? <span className='text-blue-500'>Kayıt Ol</span></p>

        </div>

      </div>
      <div className='bg-red-500'>

      </div>
    </div>
  );
};

export default Login;