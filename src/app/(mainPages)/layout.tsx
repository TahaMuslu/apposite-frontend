'use client';
import { useStore } from '@/store';
import { Button, Col, Row } from 'antd';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode; }) => {
  const { logout } = useStore();
  return (
    <Row className='h-screen w-screen overflow-x-hidden'>
      <Col span={4}>
        SideBar
        <Button type='primary' danger onClick={async () => {
          await logout();
        }}>Log out</Button>
      </Col>
      <Col span={20} className='bg-gray-100'>
        {children}
      </Col>
    </Row>
  );
};

export default RootLayout;