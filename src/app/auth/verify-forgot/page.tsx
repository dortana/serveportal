/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Image from 'next/image';
import VerificationForm from '@/components/forms/VerificationForm';
import VerificationForgotForm from '@/components/forms/VerificationForgotForm';

interface PageProps {
  searchParams: Promise<{ email?: string; phone?: string }>;
}

const VerifyPage = async ({ searchParams }: PageProps) => {
  const { email } = await searchParams;

  return (
    <div className="flex h-[calc(100vh-theme('spacing.20'))]">
      <div className='hidden lg:flex items-center justify-center flex-1 relative z-[-1] m-4 bg-tertiary rounded-lg'>
        <Image
          src='/assets/verify.png'
          alt=''
          width={1000}
          height={1000}
          priority
          className='w-full h-auto'
        />
      </div>
      <div className='flex items-center md:justify-center flex-1 flex-col gap-2'>
        <VerificationForgotForm />
      </div>
    </div>
  );
};

export default VerifyPage;
