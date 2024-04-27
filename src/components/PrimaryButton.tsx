'use client';
import React from 'react';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { h?: number, w?: number, radius?: 'full' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'none'; };

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, h, w, radius, ...props }) => {
    return (
        <button
            className={`h-${h ?? 12} w-${w ?? 12} rounded-${radius ?? 'xl'} bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 flex justify-center
        items-center shadow-lg shadow-gray-300 active:bg-red-700 active:duration-100`}
            {...props}>
            {children}
        </button>
    );
};

export default PrimaryButton;
