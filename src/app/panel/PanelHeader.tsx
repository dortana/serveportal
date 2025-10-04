import Image from 'next/image';
import LanguageSelectorButton from '@/components/language/LanguageSelectorButton';
import React from 'react';

const PanelHeader = () => {
  return (
    <div className='flex items-center justify-between w-full h-16 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-4'>
      <Image
        src='/app_logo.png'
        width={60}
        height={60}
        className='h-auto'
        alt=''
      />

      <LanguageSelectorButton />
    </div>
  );
};

export default PanelHeader;
