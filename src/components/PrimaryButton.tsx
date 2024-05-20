'use client';
import { Spin } from 'antd';
import React from 'react';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { h?: number, w?: number, loading?: boolean, radius?: 'full' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'none'; };

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, h, w, radius, loading, ...props }) => {
    return (
        <button
            {...props}
            className={`${h ? 'h-' + h : 'h-12'} ${w ? 'w-' + w : 'w-12'} ${radius ? 'rounded-' + radius : 'rounded-xl'} bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 flex justify-center
        items-center shadow-lg shadow-gray-300 active:bg-red-700 active:duration-100 text-nowrap min-w-fit px-4 ${props.className}`}
            disabled={loading}
        >
            {loading ?
                <Spin size='small' /> :
                children
            }
        </button>
    );
};

export default PrimaryButton;
