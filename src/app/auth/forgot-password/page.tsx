import React from 'react';
import Image from 'next/image';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RealIdea - Forgot Password',
};

const LoginPage = () => {
  return (
    <div className="flex h-[calc(100vh-theme('spacing.20'))]">
      <div className='hidden lg:flex items-center justify-center flex-1 relative z-[-1] m-4 bg-tertiary rounded-lg'>
        <Image
          src='/assets/password.png'
          alt=''
          width={1000}
          height={1000}
          priority
          className='w-3/4 h-auto'
        />
      </div>
      <div className='flex items-center md:justify-center flex-1 flex-col gap-2'>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default LoginPage;
