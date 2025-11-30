'use client';
import React, { useState } from 'react';
import MenuIcon from '@/components/icons/MenuIcon';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import PanelSidebar from '@/app/panel/PanelSidebar';
import { User } from '@/app/generated/prisma/client';

const ToggleMenu = ({ user }: { user: User }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className='bg-tertiary h-10 rounded-full flex items-center justify-center cursor-pointer px-2 gap-2 md:hidden'>
          <MenuIcon />
          <span className='text-sm'>{t('Menu')}</span>
        </div>
      </SheetTrigger>
      <SheetContent side='left' className='w-[80vw]'>
        <SheetTitle></SheetTitle>
        <PanelSidebar
          onLinkClick={() => setOpen(false)}
          className='w-full'
          user={user}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ToggleMenu;
