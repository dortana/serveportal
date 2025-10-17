'use client';
import React, { useState } from 'react';
import MenuIcon from '@/components/icons/MenuIcon';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import BrandText from './BrandText';

const SiteToggleMenu = ({ websiteLinks }: { websiteLinks: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className='bg-tertiary h-10 rounded-full flex items-center justify-center cursor-pointer px-2 gap-2 md:hidden'>
          <MenuIcon />
        </div>
      </SheetTrigger>
      <SheetContent side='left' className='w-[80vw]'>
        <SheetTitle></SheetTitle>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/app_logo.png'
            width={50}
            height={50}
            className='h-auto'
            alt='App Logo'
          />
          <BrandText />
        </Link>
        <hr className='mt-6' />
        <div className='flex flex-col gap-2 mt-3'>
          {websiteLinks.map((item: any, index: any) => {
            if (item.sublinks.length > 0) {
              return (
                <label
                  className='flex flex-col w-full cursor-pointer relative'
                  key={index}
                >
                  <input type='checkbox' className='peer hidden' />
                  <div className='flex items-center justify-between w-full p-4 rounded-md hover:bg-tertiary hover:text-brand transition-all duration-300'>
                    {item.name}
                  </div>
                  <svg
                    className='absolute right-3 top-[18px] size-5 transition-all transform peer-checked:rotate-180 peer-hover:text-brand'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                    color='#000000'
                    fill='none'
                  >
                    <path
                      d='M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </svg>
                  <div className='hidden peer-checked:flex flex-col space-y-2 overflow-hidden transition-all duration-300 p-2'>
                    {item.sublinks.map((sub: any, index: any) => (
                      <Link
                        key={index}
                        href={sub.href}
                        className='flex items-center justify-between min-h-14 rounded-md w-full px-4 py-2 hover:bg-tertiary transition-all duration-300 group/follow'
                      >
                        <div>
                          <span className='text-[rgb(29, 29, 29)]'>
                            {sub.name}
                          </span>
                          <p className='text-xs text-neutral-400'>
                            {sub.description}
                          </p>
                        </div>

                        <svg
                          className='opacity-0 size-6 transition-all duration-300 transform translate-x-0 group-hover/follow:opacity-100 group-hover/follow:translate-x-1'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          width='24'
                          height='24'
                          color='#000000'
                          fill='none'
                        >
                          <path
                            d='M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          ></path>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </label>
              );
            } else {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className='flex items-center p-4 rounded-md w-full h-fit text-[rgb(29, 29, 29)] hover:bg-tertiary hover:text-brand transition-all duration-300'
                >
                  {item.name}
                </Link>
              );
            }
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SiteToggleMenu;
