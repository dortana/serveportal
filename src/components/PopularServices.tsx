import React from 'react';
import Heading from './Heading';
import { useServices } from '@/hooks/useServices';
import Link from 'next/link';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

const PopularServices = () => {
  const t = useTranslations();
  const services = useServices();
  const popularServices = services.filter(service => service.isPopular);
  return (
    <section className='w-full py-20 flex flex-col justify-center items-center gap-8 overflow-hidden'>
      <Heading
        head={t('Popular Services')}
        subHead={t('Explore our wide range of professional services')}
      />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full px-4 max-w-6xl max-md:px-10'>
        {popularServices.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className='hover:scale-110 transition cursor-pointer'
            >
              <div className='bg-tertiary rounded-lg flex items-center justify-center py-8'>
                <Icon className='w-12 h-12 text-brand-blue' />
              </div>
              <h3 className='mt-2 text-center text-lg font-medium text-black'>
                {item.label}
              </h3>
            </div>
          );
        })}
      </div>
      <Button
        asChild
        className='mt-4 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white animate-bounce-x'
        variant='outline'
      >
        <Link href='/services'>
          {t('Explore all services')}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            color='currentColor'
            fill='none'
          >
            <path
              d='M12.5 18C12.5 18 18.5 13.5811 18.5 12C18.5 10.4188 12.5 6 12.5 6'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M5.50005 18C5.50005 18 11.5 13.5811 11.5 12C11.5 10.4188 5.5 6 5.5 6'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>
      </Button>
    </section>
  );
};

export default PopularServices;
