"use client"

import { useStore } from '@/store';
import { Button } from 'antd'
import React from 'react'

const Login = () => {

  const {login} = useStore();

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Button onClick={() => {
        login({
          email: "admin@admin.com",
          password: "P@ssw0rd"
        });
      }} type='primary' danger>Giriş Yap</Button>
    </div>
  )
}

export default Login