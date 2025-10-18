'use client';
import React, { ReactNode } from 'react';
import { Command, CommandDialog, CommandInput } from '../ui/command';
import { useTranslations } from 'next-intl';
import { DialogTitle } from '../ui/dialog';

const LookupInputCommand = ({
  currentCity,
  children,
  citySelectorCom,
}: {
  currentCity: string;
  children: ReactNode;
  citySelectorCom: ReactNode;
}) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className='relative mx-auto w-[85%] md:w-[450px]'>
        <Command className='rounded-lg shadow-[0px_0px_10px_3px_#00000024] '>
          <CommandInput
            placeholder={t('Search in {currentCity} ...', { currentCity })}
            className='pr-26'
            onClick={() => setOpen(true)}
          />
        </Command>
        <div className='absolute flex items-center gap-2 top-1/4 right-2'>
          <div className='border-l-2 h-6 self-center' />
          {citySelectorCom}
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={t('Search in {currentCity} ...', { currentCity })}
          className='pr-26'
        />
        <DialogTitle
          title={t('Search in {currentCity} ...', { currentCity })}
        />
        {children}
      </CommandDialog>
    </>
  );
};

export default LookupInputCommand;
