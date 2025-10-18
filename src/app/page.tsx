import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { app_name, operation_places } from '@/lib/data';
import { InfiniteMovingCards } from '@/components/InfiniteMovingCards';
// import ServiceLookup from '@/components/ServiceLookup';
import TypeWriter from '@/components/TypeWriter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CitySelector from '@/components/city/CitySelector';
import SearchContent from '@/components/lookup/SearchContent';
import LookupInputCommand from '@/components/lookup/LookupInputCommand';
import { cityGetAction } from '@/actions/app';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: app_name + ' - ' + t('Home'),
  };
}

export default async function Home() {
  const t = await getTranslations();
  const city = await cityGetAction();
  return (
    <main id='top'>
      <SiteHeader />
      {/* Hero section */}
      <section className='w-full py-12 md:py-24 flex flex-col justify-center items-center bg-tertiary'>
        <h2 className='text-2xl md:text-4xl font-semibold mb-4 px-4 text-center text-brand'>
          <TypeWriter
            words={[
              'Finding trusted experts',
              'Quality service',
              'Transparent pricing',
            ]}
            className='text-black'
          />
          <br />

          {t('made easy!')}
        </h2>
        <p className='text-zinc-500 max-w-2xl mx-auto mb-8 text-center px-4'>
          {t(
            'What service do you need? Just type it in the search below and instantly find trusted professionals ready to help.',
          )}
        </p>
        <br />
        <LookupInputCommand
          citySelectorCom={<CitySelector className='mr-1' />}
          currentCity={city}
        >
          <SearchContent />
        </LookupInputCommand>
      </section>
      <br />
      <br />
      <br />
      <div className='ml-[45%] pb-20'>Other contents ...</div>
      {/* Cities of operation */}
      <section className='w-full py-12 flex flex-col justify-center items-center bg-tertiary overflow-hidden'>
        <h2 className='text-2xl md:text-4xl font-semibold mb-4 px-4'>
          {t('ServePortal in your city')}
        </h2>
        <p className='text-zinc-500 max-w-2xl mx-auto mb-8 text-center px-4'>
          {t(
            'Discover trusted professionals available across multiple Hungarian cities — bringing quality services closer to you.',
          )}
        </p>
        <InfiniteMovingCards items={operation_places[0].cities} />
      </section>
      <div className='w-full flex items-center justify-center py-10'>
        <Button asChild>
          <Link href='#top' className='animate-bounce'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              color='#ffffff'
              fill='none'
            >
              <path
                d='M18 11.5C18 11.5 13.5811 5.50001 12 5.5C10.4188 5.49999 6 11.5 6 11.5'
                stroke='#ffffff'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M18 18.5C18 18.5 13.5811 12.5 12 12.5C10.4188 12.5 6 18.5 6 18.5'
                stroke='#ffffff'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </Button>
      </div>
      <SiteFooter />
    </main>
  );
}
