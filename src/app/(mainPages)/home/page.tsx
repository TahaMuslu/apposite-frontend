"use client";

import React from 'react';
import { useSession } from 'next-auth/react';

const Home = () => {
  const session = useSession();
  return (
    <div className='w-full'>
      <p>
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
        {JSON.stringify(session.data?.user)}
      </p>
      <p>

      </p>
    </div>
  );
};

export default Home;