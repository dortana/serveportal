import LanguageSelectorButton from '@/components/language/LanguageSelectorButton';
import React from 'react';
import { Input } from '@/components/ui/input';
import SearchIcon from '@/components/icons/SearchIcon';
import { getTranslations } from 'next-intl/server';
import ToggleMenu from '@/app/panel/ToggleMenu';
import { User } from '@prisma/client';
import ExitIcon from '@/components/icons/ExitIcon';
import { signOutAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import BrandText from '@/components/BrandText';

const PanelHeader = async ({ user }: { user: User }) => {
  const t = await getTranslations();
  return (
    <div className='flex items-center justify-between w-full h-16 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-4'>
      <Link href='/' className='flex items-center gap-2'>
        <Image
          src='/app_logo.png'
          width={40}
          height={50}
          className='h-auto'
          alt='App Logo'
        />
        <BrandText className='max-md:hidden' />
      </Link>
      <div className='flex gap-2'>
        <ToggleMenu user={user} />
        <div className='flex items-center relative max-md:hidden'>
          <Input
            type='text'
            placeholder={t('Search')}
            className='rounded-full pr-10 focus:mr-3 focus:w-80 transform transition-all duration-300 peer bg-tertiary border-0 shadow-none'
          />
          <SearchIcon className='peer-focus:size-6 absolute cursor-pointer hover:text-brand peer-focus:right-5 right-3 -ml-8 transform transition-all duration-300' />
        </div>
        <LanguageSelectorButton />
        <div className='border-l-2 h-6 self-center' />
        {/* Logout Button */}
        <form
          action={signOutAction}
          className='bg-tertiary size-10 rounded-full flex items-center justify-center cursor-pointer'
        >
          <Button
            type='submit'
            variant='ghost'
            className='hover:size-5 rounded-full'
          >
            <ExitIcon className='size-5' />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PanelHeader;
