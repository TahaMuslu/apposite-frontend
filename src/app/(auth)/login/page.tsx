"use client";

import { useStore } from '@/store';
import { Button } from 'antd';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Login = () => {

  const { login } = useStore();

  const searchParams = useSearchParams();

  const from = searchParams.get('from');

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Button onClick={() => {
        login({
          callbackUrl: from || "/",
          requestData: {
            email: "admin@admin.com",
            password: "P@ssw0rd"
          },
        });
      }} type='primary' danger>Giriş Yap</Button>
    </div>
  );
};

export default Login;