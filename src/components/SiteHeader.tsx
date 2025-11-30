import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { auth } from '@/lib/auth';
import LanguageSelectorButton from './language/LanguageSelectorButton';
import { headers } from 'next/headers';
import SiteToggleMenu from './SiteToggleMenu';
import Image from 'next/image';
import BrandText from './BrandText';
import { UserRole } from '@/app/generated/prisma/client';

const SiteHeader = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const t = await getTranslations();
  const websiteLinks = [
    { name: t('Home'), href: '/', sublinks: [] },
    {
      name: t('Get Started'),
      href: '/get-started',
      sublinks: [
        {
          name: t('Explore Services'),
          href: '/explore-services',
          description: t('Discover trusted experts across all categories'),
        },
        {
          name: t('Find an Expert'),
          href: '/find-an-expert',
          description: t('Search by name, skill, or city to book instantly'),
        },
        {
          name: t('Join as a Professional'),
          href: '/join-us',
          description: t('Showcase your expertise and grow with ServePortal'),
        },
      ],
    },
    { name: t('About Us'), href: '/about-us', sublinks: [] },
    { name: t('Contact Us'), href: '/contact-us', sublinks: [] },
    { name: t('Terms & Privacy'), href: '/terms-and-privacy', sublinks: [] },
  ];
  return (
    <header className='h-20 sticky top-0 left-0 w-full px-4 flex items-center justify-between border-b border-[rgba(29, 29, 29, 0.08)] bg-white z-10'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/app_logo.png'
              width={50}
              height={50}
              className='h-auto'
              alt='App Logo'
            />
            <BrandText className='max-lg:hidden' />
          </Link>
        </div>
        <div className='h-6 border-l border-separate max-lg:hidden' />
        <div className='flex items-center gap-6 max-md:hidden'>
          <ul className='flex space-x-4'>
            {websiteLinks.map((item, index) => {
              if (item.sublinks.length > 0) {
                return (
                  <li className='relative group' key={index}>
                    <button className='flex items-center text-black hover:text-brand transition-colors duration-300'>
                      {item.name}
                      <svg
                        className='size-4 ml-1 group-hover:rotate-180 transition-all duration-300'
                        viewBox='0 0 24 24'
                        width='24'
                        height='24'
                        color='currentColor'
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
                    </button>
                    <div className='absolute left-0 mt-4 w-80 min-h-fit z-20 space-y-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2'>
                      {item.sublinks.map((sub, index) => {
                        return (
                          <Link
                            key={index}
                            href={sub.href}
                            className='flex items-center justify-between min-h-14 rounded-md w-full px-4 py-2 hover:bg-tertiary hover:text-brand transition-all duration-300 group/follow'
                          >
                            <div>
                              <span className='text-black font-medium'>
                                {sub.name}
                              </span>
                              <p className='text-xs text-zinc-500'>
                                {sub.description}
                              </p>
                            </div>
                            <svg
                              className='opacity-0 size-6 transition-all duration-300 transform translate-x-0 group-hover/follow:opacity-100 group-hover/follow:translate-x-1'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              width='24'
                              height='24'
                              color='currentColor'
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
                        );
                      })}
                    </div>
                  </li>
                );
              } else {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className='text-[rgb(29, 29, 29)] hover:text-brand transition-colors duration-300'
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
          </ul>
        </div>
      </div>
      <div className='flex items-center gap-2 flex-row-reverse'>
        <SiteToggleMenu websiteLinks={websiteLinks} />
        <LanguageSelectorButton />
        <div className='h-6 border-l border-separate' />
        {session?.session?.token ? (
          <Link
            href={
              session?.user.role === UserRole.EXPERT
                ? '/expert-panel/dashboard'
                : '/panel/dashboard'
            }
          >
            <Button className='rounded-full min-w-24 max-sm:text-xs'>
              {t('My Account')}
            </Button>
          </Link>
        ) : (
          <>
            <Link href='/auth/signup'>
              <Button className='rounded-full min-w-24 max-sm:text-xs'>
                {t('Sign Up')}
              </Button>
            </Link>
            <Link href='/auth/login'>
              <Button
                variant='link'
                className='rounded-full p-0 mr-1 max-sm:text-xs'
              >
                {t('Login')}
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
