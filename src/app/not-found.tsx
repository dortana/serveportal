// import Footer from '@/components/Footer';
// import Header from '@/components/Header';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = async () => {
  const t = await getTranslations();
  return (
    <div>
      {/* <Header /> */}
      <div className='flex items-center w-full max-md:flex-col'>
        <div className='flex-1 p-6 flex justify-end max-md:justify-center'>
          <Image
            src='/assets/not-found.jpg'
            width={500}
            height={500}
            className='max-md:h-[90%] max-md:w-[90%]'
            alt='not-found'
          />
        </div>
        <div className='flex flex-col gap-4 flex-1 justify-start p-6 max-md:items-center'>
          <h1 className='text-3xl md:text-6xl font-extrabold'>Oops!</h1>
          <h3 className='text-xl md:text-2xl text-zinc-500'>
            {t("We couldn't find the page you were looking for.")}
          </h3>
          <Link
            href='/'
            className='bg-black text-white h-10 px-6 pl-4 w-fit flex items-center justify-center rounded-full mt-5 max-md:mb-10'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='20'
              height='20'
              color='#fff'
              fill='none'
            >
              <path
                d='M15 6L9 12.0001L15 18'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeMiterlimit='16'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
            {t('Go to Home')}
          </Link>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default NotFoundPage;
