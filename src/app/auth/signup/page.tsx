import React from 'react';
import SignUpForm from '@/components/forms/SignUpForm';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RealIdea - Sign Up',
};

const SignUpPage = () => {
  return (
    <div className="flex h-[calc(100vh-theme('spacing.20'))]">
      <div className='hidden lg:flex items-center justify-center flex-1 relative z-[-1] m-4 bg-tertiary rounded-lg'>
        <Image
          src='/assets/signup.png'
          alt=''
          width={1000}
          height={1000}
          priority
          className='w-2/3 h-auto'
        />
      </div>
      <div className='flex items-center md:justify-center flex-1 flex-col gap-2'>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
