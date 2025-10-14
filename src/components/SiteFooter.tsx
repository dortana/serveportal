import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import LinkedinIcon from './icons/LinkedinIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';

const SiteFooter = async () => {
  const t = await getTranslations();
  return (
    <footer className='border-t border-[rgba(29, 29, 29, 0.08)] bg-white px-4 md:px-8 pt-8 space-y-4 mb-12'>
      <div className='flex items-baseline flex-wrap'>
        <div className='w-full md:flex-1 space-y-4'>
          <div className='flex items-center gap-2'>
            <Logo className='text-brand' />
            <Link href='/'>
              <h2 className='font-medium tracking-widest'>RovixPro</h2>
            </Link>
          </div>
          <p className='text-zinc-500 text-justify'>
            {t(
              'RovixPro is a next-generation financial manager that empowers individuals and businesses to take full control of their budgets, expenses, and investments through intuitive, data-driven tools. Our platform streamlines expense tracking, goal setting, and portfolio analysis to deliver real-time insights and personalized recommendations. Built on a foundation of security and innovation, RovixPro makes smarter money management effortless and accessible for everyone.',
            )}
          </p>
          <br />
          <div className='flex items-center gap-4 flex-wrap'>
            <Link
              href='/'
              className='font-semibold hover:text-brand transition-all duration-300'
            >
              {t('Home')}
            </Link>
            <Link
              href='/'
              className='font-semibold hover:text-brand transition-all duration-300'
            >
              {t('Products')}
            </Link>
            <Link
              href='/'
              className='font-semibold hover:text-brand transition-all duration-300'
            >
              {t('Services')}
            </Link>
            <Link
              href='/about-us'
              className='font-semibold hover:text-brand transition-all duration-300'
            >
              {t('About Us')}
            </Link>
            <Link
              href='/contact-us'
              className='font-semibold hover:text-brand transition-all duration-300'
            >
              {t('Contact Us')}
            </Link>
          </div>
          <br />
        </div>
        <div className='w-full mt-6 md:mt-0 pt-10 max-md:pt-0 md:flex-1 flex md:items-center flex-col'>
          <div className='w-fit'>
            <div className='space-y-1'>
              <div className='flex items-center gap-2 font-semibold'>
                <svg
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                  color='#000000'
                  fill='none'
                >
                  <path
                    opacity='0.4'
                    d='M2.99714 7.08468C4.52505 3.51303 8.17538 1.25 12.0015 1.25C15.8277 1.25 19.478 3.51303 21.0059 7.08468C22.4261 10.4045 21.6591 13.2362 20.0582 15.6609C18.7304 17.672 16.787 19.4627 15.0391 21.0732L15.0391 21.0732L15.039 21.0732C14.7286 21.3592 14.4243 21.6396 14.1308 21.9144C13.5558 22.4528 12.7919 22.75 12.0015 22.75C11.2112 22.75 10.4473 22.4528 9.87231 21.9145L9.87066 21.9129C9.5601 21.6204 9.23725 21.3218 8.90758 21.0169L8.90742 21.0168C7.17835 19.4178 5.26177 17.6454 3.94771 15.6595C2.34496 13.2373 1.57518 10.4086 2.99714 7.08468Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <span>{t('Address')}</span>
              </div>
              <p className='text-[rgba(29,29,29,0.64)] ml-8'>
                1117 Budapest, Szerémi út 4.
              </p>
            </div>
            <div className='space-y-1 mt-2'>
              <div className='flex items-center gap-2 font-semibold'>
                <svg
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                  color='#000000'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M11.5 3.5C11.5 2.94772 11.9477 2.5 12.5 2.5C17.4706 2.5 21.5 6.52944 21.5 11.5C21.5 12.0523 21.0523 12.5 20.5 12.5C19.9477 12.5 19.5 12.0523 19.5 11.5C19.5 7.63401 16.366 4.5 12.5 4.5C11.9477 4.5 11.5 4.05228 11.5 3.5ZM12 7C12 6.44772 12.4477 6 13 6C15.7614 6 18 8.23858 18 11C18 11.5523 17.5523 12 17 12C16.4477 12 16 11.5523 16 11C16 9.34315 14.6569 8 13 8C12.4477 8 12 7.55228 12 7Z'
                    fill='currentColor'
                  ></path>
                  <path
                    opacity='0.4'
                    d='M9.09121 5.05609L8.83795 4.48626C8.49683 3.71873 8.32626 3.33496 8.04556 3.06369C7.86027 2.88463 7.64223 2.74293 7.40335 2.64634C7.04146 2.5 6.6215 2.5 5.78157 2.5C4.53091 2.5 3.90558 2.5 3.41836 2.80363C3.11954 2.98986 2.83374 3.30601 2.67852 3.62206C2.42545 4.13735 2.48286 4.70507 2.59768 5.84052C3.55041 15.2623 8.73768 20.4496 18.1595 21.4023C19.2949 21.5171 19.8626 21.5745 20.3779 21.3215C20.694 21.1663 21.0101 20.8805 21.1964 20.5816C21.5 20.0944 21.5 19.4691 21.5 18.2184C21.5 17.3785 21.5 16.9585 21.3537 16.5966C21.2571 16.3578 21.1154 16.1397 20.9363 15.9544C20.665 15.6737 20.2813 15.5032 19.5137 15.162L18.9439 14.9088C18.2714 14.6099 17.9351 14.4604 17.5978 14.432C17.239 14.4018 16.8786 14.4687 16.5546 14.6257C16.2499 14.7733 15.9897 15.0335 15.4693 15.5539C14.9573 16.0659 14.7013 16.3219 14.3679 16.4727C14.0435 16.6194 13.5876 16.6818 13.2357 16.6276C12.874 16.5719 12.6082 16.4219 12.0767 16.1221C10.1922 15.0593 8.94074 13.8078 7.87787 11.9233C7.57805 11.3918 7.42815 11.126 7.37245 10.7643C7.31825 10.4124 7.38061 9.9565 7.52731 9.63208C7.67807 9.29869 7.93406 9.04269 8.44605 8.5307C8.96647 8.01029 9.22668 7.75008 9.37427 7.44543C9.53126 7.12138 9.59817 6.76105 9.56797 6.40224C9.53957 6.06491 9.39012 5.72863 9.09121 5.05609Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <span>{t('Phone')}</span>
              </div>
              <p className='text-[rgba(29,29,29,0.64)] ml-8'>+36 30 527 5249</p>
            </div>
            <div className='space-y-1 mt-2'>
              <div className='flex items-center gap-2 font-semibold'>
                <svg
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                  color='#000000'
                  fill='none'
                >
                  <path
                    opacity='0.4'
                    d='M15.4546 9.662L19.6904 7.26197C20.0514 7.05742 20.2319 6.95514 20.3788 7.03609C20.5256 7.11703 20.5353 7.31979 20.5546 7.72529C20.5807 8.27185 20.5948 8.90551 20.6108 9.6547C20.6152 9.85716 20.6186 9.9956 20.6211 10.0968C20.6348 10.6485 21.0582 11.1048 21.6099 11.1166C22.1617 11.1283 22.6342 10.6909 22.6211 10.1392C22.6184 10.0269 22.6143 9.86761 22.6089 9.61215L22.6073 9.53677C22.576 8.07128 22.5502 6.86037 22.3796 5.87916C22.1978 4.8336 21.839 3.95811 21.0895 3.20674C20.6661 2.78228 20.1998 2.4827 19.6839 2.26889C19.6054 2.22604 19.5213 2.19373 19.4336 2.17311C19.1038 2.05684 18.7545 1.97116 18.3842 1.90676C17.3833 1.73265 16.1414 1.70152 14.632 1.66368L14.5572 1.66181C12.6014 1.61273 11.1484 1.61274 9.19258 1.66181L9.11773 1.66369C7.60837 1.70152 6.36649 1.73265 5.36552 1.90675C4.30315 2.09154 3.41364 2.45141 2.66024 3.20674C1.91078 3.95811 1.55193 4.8336 1.37014 5.87916C1.19953 6.86038 1.17371 8.07123 1.14246 9.53675L1.14085 9.61214C1.11955 10.6101 1.11956 11.14 1.14086 12.1379L1.14247 12.2133C1.17372 13.6788 1.19954 14.8896 1.37015 15.8709C1.55195 16.9164 1.91079 17.7919 2.66025 18.5433C3.41365 19.2986 4.30317 19.6585 5.36554 19.8433C6.3665 20.0174 7.60838 20.0485 9.11773 20.0863L9.1926 20.0882C9.52079 20.0964 9.72218 20.1033 9.87712 20.1088C10.428 20.1282 10.8747 19.6782 10.8747 19.127C10.8747 18.5758 10.4278 18.1314 9.87696 18.1118C9.73186 18.1066 9.54181 18.1003 9.24279 18.0928C7.63984 18.0526 6.54661 18.0226 5.70843 17.8768C4.91515 17.7388 4.45298 17.5124 4.07609 17.1345C3.69526 16.7527 3.47264 16.2968 3.33919 15.5293C3.19749 14.7143 3.17223 13.6553 3.13892 12.0953C3.11822 11.1258 3.11821 10.6242 3.13891 9.6547C3.15491 8.90561 3.16904 8.27204 3.19511 7.72553C3.21445 7.32001 3.22412 7.11725 3.37096 7.0363C3.5178 6.95535 3.69831 7.05763 4.05933 7.26219L8.29473 9.662C9.59434 10.3984 10.6935 10.875 11.8747 10.875C13.0559 10.875 14.155 10.3984 15.4546 9.662Z'
                    fill='currentColor'
                  ></path>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M17.3751 13.375C15.4421 13.375 13.8751 14.942 13.8751 16.875C13.8751 18.808 15.4421 20.375 17.3751 20.375C17.9274 20.375 18.3751 20.8227 18.3751 21.375C18.3751 21.9273 17.9274 22.375 17.3751 22.375C14.3375 22.375 11.8751 19.9126 11.8751 16.875C11.8751 13.8374 14.3375 11.375 17.3751 11.375C20.4126 11.375 22.8751 13.8374 22.8751 16.875V17.375C22.8751 18.7557 21.7558 19.875 20.3751 19.875C19.6547 19.875 19.0054 19.5703 18.5492 19.0827C18.1991 19.2693 17.7995 19.375 17.3751 19.375C15.9944 19.375 14.8751 18.2557 14.8751 16.875C14.8751 15.4943 15.9944 14.375 17.3751 14.375C18.7558 14.375 19.8751 15.4943 19.8751 16.875V17.375C19.8751 17.6511 20.0989 17.875 20.3751 17.875C20.6512 17.875 20.8751 17.6511 20.8751 17.375V16.875C20.8751 14.942 19.3081 13.375 17.3751 13.375ZM17.8751 16.875C17.8751 16.5989 17.6512 16.375 17.3751 16.375C17.0989 16.375 16.8751 16.5989 16.8751 16.875C16.8751 17.1511 17.0989 17.375 17.3751 17.375C17.6512 17.375 17.8751 17.1511 17.8751 16.875Z'
                    fill='currentColor'
                  ></path>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M17.3749 13.375C15.4419 13.375 13.8749 14.942 13.8749 16.875C13.8749 18.808 15.4419 20.375 17.3749 20.375C17.9272 20.375 18.3749 20.8227 18.3749 21.375C18.3749 21.9273 17.9272 22.375 17.3749 22.375C14.3374 22.375 11.8749 19.9126 11.8749 16.875C11.8749 13.8374 14.3374 11.375 17.3749 11.375C20.4125 11.375 22.8749 13.8374 22.8749 16.875V17.375C22.8749 18.7557 21.7557 19.875 20.3749 19.875C19.6545 19.875 19.0053 19.5703 18.5491 19.0827C18.199 19.2693 17.7993 19.375 17.3749 19.375C15.9942 19.375 14.8749 18.2557 14.8749 16.875C14.8749 15.4943 15.9942 14.375 17.3749 14.375C18.7557 14.375 19.8749 15.4943 19.8749 16.875V17.375C19.8749 17.6511 20.0988 17.875 20.3749 17.875C20.6511 17.875 20.8749 17.6511 20.8749 17.375V16.875C20.8749 14.942 19.3079 13.375 17.3749 13.375ZM17.8749 16.875C17.8749 16.5989 17.6511 16.375 17.3749 16.375C17.0988 16.375 16.8749 16.5989 16.8749 16.875C16.8749 17.1511 17.0988 17.375 17.3749 17.375C17.6511 17.375 17.8749 17.1511 17.8749 16.875Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <span>{t('Email')}</span>
              </div>
              <p className='text-[rgba(29,29,29,0.64)] ml-8'>
                info@dortana.com
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 w-full justify-end -mt-11'>
            <Image
              src='/assets/hungary.webp'
              width={50}
              height={100}
              className='h-auto rounded-md'
              alt='hungary'
            />
            <Image
              src='/assets/european-union.webp'
              width={50}
              height={100}
              className='h-auto rounded-md'
              alt='hungary'
            />
          </div>
        </div>
      </div>
      <hr />
      <div className='flex items-center justify-between flex-wrap gap-4 max-md:flex-col-reverse'>
        <p className='text-sm max-md:mt-6'>
          {t('Copyright © {year} RovixPro. All rights reserved.', {
            year: new Date().getFullYear(),
          })}
        </p>
        <div className='flex items-center gap-2'>
          <Link href='/' className='bg-tertiary p-2 rounded-lg border'>
            <InstagramIcon />
          </Link>
          <Link href='/' className='bg-tertiary p-2 rounded-lg border'>
            <FacebookIcon />
          </Link>
          <Link href='/' className='bg-tertiary p-2 rounded-lg border'>
            <YoutubeIcon />
          </Link>
          <Link href='/' className='bg-tertiary p-2 rounded-lg border'>
            <LinkedinIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
