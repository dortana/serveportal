import { app_name } from '@/lib/data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: app_name + ' - ' + t('Expert Verification'),
  };
}

const ExpertVerificationPage = () => {
  return (
    <div className='p-4 rounded-lg h-full bg-white'>Expert Verification</div>
  );
};

export default ExpertVerificationPage;
