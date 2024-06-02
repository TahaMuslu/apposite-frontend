"use client";

import { AxiosResponse } from '@/services/types';
import { useStore } from '@/store';
import { Button, Carousel, Col, Input, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Register = () => {
  const { register, showNotification } = useStore();
  const [registerLoading, setRegisterLoading] = useState(false);

  const route = useRouter();

  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordAgain: ""
  });

  useEffect(() => {
    document.title = "Kayıt Ol";
  }, []);

  const registerControl = () => {
    if (registerData.password !== registerData.passwordAgain) {
      showNotification({
        message: "Şifreler Uyuşmuyor",
        type: "error",
      });
      return;
    }
    registerData.name = registerData.name.trim();
    setRegisterLoading(true);
    register(registerData).then(() => {
      showNotification({
        message: "Kayıt Başarılı",
        type: "success",
      });
      route.push("/login");
    }).catch((res: AxiosResponse) => {
      showNotification({
        message: "Kayıt Başarısız",
        type: "error",
      });
    }).finally(() => {
      setRegisterLoading(false);
    });
  };

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
                  Özgün olarak oluşturduğunuz tarifleri paylaşarak diğer kullanıcılarla etkileşime geçin.
                </p>
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
                  Kendi damak tadınıza uygun tarifler oluşturarak diğer kullanıcılarla paylaşın.
                </p>
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
                  Kullanım tarihi yaklaşan malzemelerinizi değerlendirerek israfı önleyin.
                </p>
              </Col>
            </Row>
          </div>
        </Carousel>
      </div>
    );
  };

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
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen w-screen'>
      <div className='grid grid-cols-12 grid-rows-10 place-items-center'>
        <div className='row-span-1 col-span-full text-start me-auto ms-6'>
          <h1 className='text-2xl'>Arom<span className='text-red-500'>AI</span></h1>
        </div>
        <div className='row-span-8 col-span-8 col-start-3 w-full'>
          <p className='text-2xl'>Hoşgeldin</p>
          <p className='text-md text-gray-500 mt-2'>Lütfen devam etmek için kayıt ol</p>
          <div className='mt-4 w-full grid grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor="name"
                className='block text-sm font-medium text-gray-500'
              >
                Ad
              </label>
              <Input
                id='name'
                className='w-full mt-2'
                placeholder='Lütfen adınızı giriniz'
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                value={registerData.name}
                size='large'
              />
            </div>
            <div>
              <label
                htmlFor="surname"
                className='block text-sm font-medium text-gray-500'
              >
                Soyad
              </label>
              <Input
                id='surname'
                className='w-full mt-2'
                placeholder='Lütfen soyadınızı giriniz'
                onChange={(e) => setRegisterData({ ...registerData, surname: e.target.value.trim() })}
                value={registerData.surname}
                size='large'
              />
            </div>
          </div>
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
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value.trim() })}
              value={registerData.email}
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
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value.trim() })}
              value={registerData.password}
              size='large'
            />
          </div>
          <div className='mt-4 w-full'>
            <label
              htmlFor="password-again"
              className='block text-sm font-medium text-gray-500'
            >
              Şifre Tekrar
            </label>
            <Input.Password
              id='password-again'
              className='w-full mt-2'
              placeholder='Lütfen şifrenizi tekrar giriniz'
              onChange={(e) => setRegisterData({ ...registerData, passwordAgain: e.target.value.trim() })}
              value={registerData.passwordAgain}
              size='large'
            />
          </div>
          <Button
            type='primary'
            className='mt-8 bg-red-500 hover:bg-red-600 w-full h-10'
            onClick={() => registerControl()}
            loading={registerLoading}
          >
            Kayıt Ol
          </Button>

          <p className='text-sm mt-2 text-gray-500 text-center'>Zaten Hesabın var mı? <Link href='/login' className='text-red-500 cursor-pointer'>Giriş Yap</Link></p>

        </div>

      </div>
      <MyCarousel />
    </div >
  );
};

export default Register;