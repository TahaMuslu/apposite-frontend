"use client";

import { useStore } from '@/store';
import { Button, Carousel, Col, Row } from 'antd';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
  const [loading, setLoading] = useState<boolean>();

  const { login,showNotification } = useStore();

  const [loginData, setLoginData] = useState({
    email: "admin@admin.com",
    password: "P@ssw0rd"
  });

  useEffect(() => {
    document.title = "Giriş Yap";
  }, []);


  const searchParams = useSearchParams();

  const from = searchParams.get('from');

  const MyCarousel = () => {
    return (
      <div className="bg-red-100 overflow-hidden md:grid grid-cols-1 place-content-center hidden">
        <Carousel draggable autoplay autoplaySpeed={5000} className='h-min my-auto py-12'>
          <div className='h-full flex flex-col justify-between'>
            <div className="flex justify-center">
              <Image
                src={require("../../../assets/illustrations/login1.png")}
                alt="Login Illustration"
                className="h-72 object-contain -ml-1"
              />
            </div>
            <h2 className="text-center text-2xl mt-5">
              Kendi Tariflerinizi Paylaşın
            </h2>
            <Row justify={"center"}>
              <Col md={20} xs={22}>
                <p className="text-center text-base text-secondary dark:text-gray-400 mt-2 pr-5 pl-5">
                  Lorem ipsum dolor sit amet consectetur. Metus gravida enim lacus orci purus dictumst pellentesque potenti. Odio sit sed ut proin.                    </p>
              </Col>
            </Row>
          </div>
          <div className='h-full flex flex-col justify-between'>
            <div className="flex justify-center">
              <Image
                src={require("../../../assets/illustrations/login2.png")}
                alt="Login Illustration"
                className="h-72 object-contain -ml-1"
              />
            </div>
            <h2 className="text-center text-2xl mt-5">
              Size Özgü Tarifler Oluşturun
            </h2>
            <Row justify={"center"}>
              <Col md={20} xs={22}>
                <p className="text-center text-base text-secondary dark:text-gray-400 mt-2 pr-5 pl-5">
                  Lorem ipsum dolor sit amet consectetur. Metus gravida enim lacus orci purus dictumst pellentesque potenti. Odio sit sed ut proin.                    </p>
              </Col>
            </Row>
          </div>
          <div className='h-full flex flex-col justify-between'>
            <div className="flex justify-center">
              <Image
                src={require("../../../assets/illustrations/login3.png")}
                alt="Login Illustration"
                className="h-72 object-contain -ml-1"
              />
            </div>
            <h2 className="text-center text-2xl mt-5">
              Malzemelerinizi İsraf Etmeyin
            </h2>
            <Row justify={"center"}>
              <Col md={20} xs={22}>
                <p className="text-center text-base text-secondary dark:text-gray-400 mt-2 pr-5 pl-5">
                  Lorem ipsum dolor sit amet consectetur. Metus gravida enim lacus orci purus dictumst pellentesque potenti. Odio sit sed ut proin.                    </p>
              </Col>
            </Row>
          </div>
        </Carousel>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen w-screen'>
      <div className='grid grid-cols-12 grid-rows-10 place-items-center'>
        <div className='row-span-1 col-span-full text-start me-auto ms-6'>
          <h1 className='text-2xl'>Arom<span className='text-red-500'>AI</span></h1>
        </div>
        <div className='row-span-8 col-span-8 col-start-3 w-full'>
          <p className='text-2xl'>Tekrar Hoşgeldin</p>
          <p className='text-md text-gray-500 mt-2'>Lütfen devam etmek için giriş yap</p>
          <div className='mt-4 w-full'>
            <label
              htmlFor="email"
              className='block text-sm font-medium text-gray-500'
            >
              Email
            </label>
            <Input
              id='email'
              className='w-full mt-2'
              placeholder='Lütfen email adresinizi giriniz'
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value.trim() })}
              value={loginData.email}
              size='large'
            />
          </div>
          <div className='mt-4 w-full'>
            <label
              htmlFor="password"
              className='block text-sm font-medium text-gray-500'
            >
              Şifre
            </label>
            <Input.Password
              id='password'
              className='w-full mt-2'
              placeholder='Lütfen şifrenizi giriniz'
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value.trim() })}
              value={loginData.password}
              size='large'
            />
          </div>
          <p className='w-min ms-auto text-nowrap mt-2 text-sm text-red-500 cursor-pointer'>Şifremi Unuttum</p>
          <Button
            onClick={() => {
              setLoading(true);
              login({
                callbackUrl: from || "/",
                requestData: loginData
              })
              .catch(() => showNotification({ type: "error", message: "Giriş Yapılamadı" }))
              .finally(() => setLoading(false));
            }}
            type='primary'
            className='mt-8 bg-red-500 hover:bg-red-600 w-full h-10'
            loading={loading}
          >
            Giriş Yap
          </Button>

          <p className='text-sm mt-2 text-gray-500 text-center'>Hesabınız yok mu? <Link href={"/register"} className='text-red-500 cursor-pointer'>Hemen Oluştur</Link></p>

        </div>

      </div>
      <MyCarousel />
    </div >
  );
};

export default Login;;