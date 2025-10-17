import React from 'react';
import LoginForm from '@/components/forms/LoginForm';
import Image from 'next/image';
import { Metadata } from 'next';
import LanguageSelectorButton from '@/components/language/LanguageSelectorButton';

export const metadata: Metadata = {
  title: 'ServePortal - Login',
};

const LoginPage = () => {
  return (
    <div className='flex h-screen'>
      <div className='hidden lg:flex items-center justify-center flex-1 relative z-[-1] m-4 bg-tertiary rounded-lg'>
        <Image
          src='/assets/login.png'
          alt=''
          width={1000}
          height={1000}
          priority
          className='w-3/4 h-auto'
        />
      </div>
      <div className='flex items-center md:justify-center flex-1 flex-col gap-2'>
        <LoginForm />
        <LanguageSelectorButton showLangName />
      </div>
    </div>
  );
};

export default LoginPage;
