/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Image from 'next/image';
import VerificationForgotForm from '@/components/forms/VerificationForgotForm';
import { Metadata } from 'next';
import LanguageSelectorButton from '@/components/language/LanguageSelectorButton';
import { app_name } from '@/lib/data';

export const metadata: Metadata = {
  title: app_name + ' - Verify Account',
};

interface PageProps {
  searchParams: Promise<{ email?: string; phone?: string }>;
}

const VerifyPage = async ({ searchParams }: PageProps) => {
  const { email } = await searchParams;

  return (
    <div className='flex h-screen'>
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
        <LanguageSelectorButton showLangName />
      </div>
    </div>
  );
};

export default VerifyPage;
