import Image from 'next/image';
import LanguageSelectorButton from '@/components/language/LanguageSelectorButton';
import React from 'react';
import Logout from './Logout';
import { Input } from '@/components/ui/input';
import SearchIcon from '@/components/icons/SearchIcon';
import { getTranslations } from 'next-intl/server';

const PanelHeader = async () => {
  const t = await getTranslations();
  return (
    <div className='flex items-center justify-between w-full h-16 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-4'>
      <Image
        src='/assets/logo_with_text_1.png'
        width={200}
        height={60}
        className='h-auto'
        alt=''
      />

      <div className='flex gap-2'>
        <div className='flex items-center relative max-md:hidden'>
          <Input
            type='text'
            placeholder={t('Search')}
            className='rounded-full pr-10 focus:mr-3 focus:w-80 transform transition-all duration-300 peer bg-tertiary border-0 shadow-none'
          />
          <SearchIcon className='peer-focus:size-6 absolute cursor-pointer hover:text-brand peer-focus:right-5 right-3 peer-focus:top-2 top-3 -ml-8 transform transition-all duration-300' />
        </div>
        <LanguageSelectorButton />
        <div className='border-l-2 h-6 self-center' />
        <Logout />
      </div>
    </div>
  );
};

export default PanelHeader;
