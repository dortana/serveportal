import React from 'react';
import { languageGetAction } from '@/actions/app';
import { DialogClose } from '@radix-ui/react-dialog';
import { langs } from '@/lib/data';
import SelectLang from './SelectLang';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getTranslations } from 'next-intl/server';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const LanguageSelectorButton = async ({
  showLangName = false,
}: {
  showLangName?: boolean;
}) => {
  const lang = await languageGetAction();
  const t = await getTranslations();
  const currentLang = langs?.find(l => l.code === lang.value)?.lang;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            'flex items-center justify-center bg-tertiary size-10 rounded-full cursor-pointer',
            showLangName && 'w-fit px-4 gap-2',
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='20'
            height='20'
            color='#000000'
            fill='none'
          >
            <path
              d='M6.5 9H11M11 9H16.5M11 9V7.5M8 17.5C10.5 15.5 13.5 11.5 14 9M9.5 11.5C10 13 12 15.5 13 16'
              stroke='#141B34'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M19 3H4C2.89543 3 2 3.89543 2 5V20C2 21.1046 2.89543 22 4 22H19C20.1046 22 21 21.1046 21 20V5C21 3.89543 20.1046 3 19 3Z'
              stroke='#141B34'
              strokeWidth='1.5'
              strokeLinejoin='round'
            />
          </svg>
          {showLangName && currentLang && <span>{currentLang}</span>}
        </div>
      </DialogTrigger>
      <DialogContent className='sm:min-w-fit'>
        <DialogHeader className='text-left'>
          <DialogTitle>{t('Language')}</DialogTitle>
          <DialogDescription>
            {t('Please select your preferred language from the options below.')}
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 py-4'>
          {langs.map((item, index) => {
            return (
              <SelectLang
                key={index}
                selected={item.code === lang.value}
                lang={item.lang}
                code={item.code}
              />
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' className='mx-auto'>
              {t('Close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelectorButton;
