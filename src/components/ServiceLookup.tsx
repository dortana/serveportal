import React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import CitySelector from '@/components/CitySelector';
import RightArrow from '@/components/icons/RightArrow';
import Link from 'next/link';
import { Service } from '@/types/app';
import { fetchServices } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

const ServiceLookup = async () => {
  const services: Service[] = await fetchServices();
  const t = await getTranslations();
  const popularServices = services.filter(service => service.isPopular);
  const otherServices = services.filter(service => !service.isPopular);

  return (
    <div className='relative mx-auto w-[85%] md:w-[450px] group'>
      <Command className='rounded-lg shadow-[0px_0px_10px_3px_#00000024] transition-all duration-200 group-focus-within:rounded-b-none'>
        <CommandInput
          placeholder={t('Search in ServePortal ...')}
          className='pr-26'
        />
        <div className='absolute top-full left-0 w-full bg-white rounded-b-lg shadow-md z-10 opacity-0 pointer-events-none transition-all duration-200 group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-1'>
          <CommandList>
            {/* 🔍 Search by specialist */}
            <Link
              href='/expert-search'
              className='cursor-pointer bg-tertiary rounded-full mx-1 my-2 flex items-center px-3 py-2 gap-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                color='#000000'
                fill='none'
                className='!size-6'
              >
                <path
                  d='M15 7.5C15 4.73858 12.7614 2.5 10 2.5C7.23858 2.5 5 4.73858 5 7.5C5 10.2614 7.23858 12.5 10 12.5C12.7614 12.5 15 10.2614 15 7.5Z'
                  stroke='#141B34'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  opacity='0.4'
                  d='M21 21.5L19.5 20M20 17.5C20 15.8431 18.6569 14.5 17 14.5C15.3431 14.5 14 15.8431 14 17.5C14 19.1569 15.3431 20.5 17 20.5C18.6569 20.5 20 19.1569 20 17.5Z'
                  stroke='#141B34'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3 19.5C3 15.634 6.13401 12.5 10 12.5C11.0736 12.5 12.0907 12.7417 13 13.1736'
                  stroke='#141B34'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span className='text-sm'>
                {t('Search by specialist’s name')}
              </span>
              <RightArrow className='ml-auto size-4' />
            </Link>
            <hr />

            <CommandEmpty>{t('No results found.')}</CommandEmpty>

            {/* 🌟 Popular services (shown by default) */}
            <CommandGroup heading={t('Popular services')}>
              {popularServices.map(service => {
                const Icon = service.icon;
                return (
                  <CommandItem
                    key={service.id}
                    className='cursor-pointer'
                    value={service.label}
                  >
                    <Icon className='!size-6' />
                    <span>{service.label}</span>
                    <RightArrow className='ml-auto' />
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {/* 🔎 Other services (searchable only) */}

            <CommandGroup
              heading={t('Other services')}
              className="hidden group-has-[input:not([value=''])]:block"
            >
              {otherServices.map(service => {
                const Icon = service.icon;
                return (
                  <CommandItem
                    key={service.id}
                    className='cursor-pointer'
                    value={service.label}
                  >
                    <Icon className='!size-6' />
                    <span>{service.label}</span>
                    <RightArrow className='ml-auto' />
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <CommandSeparator />
          </CommandList>
        </div>
      </Command>
      <div className='absolute flex items-center gap-2 top-1/4 right-2'>
        <div className='border-l-2 h-6 self-center' />
        <CitySelector className='mr-1' />
      </div>
    </div>
  );
};

export default ServiceLookup;
