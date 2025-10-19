import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { app_name, fetchServices, operation_places } from '@/lib/data';
import { InfiniteMovingCards } from '@/components/InfiniteMovingCards';
// import ServiceLookup from '@/components/ServiceLookup';
import TypeWriter from '@/components/TypeWriter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CitySelector from '@/components/city/CitySelector';
import SearchContent from '@/components/lookup/SearchContent';
import LookupInputCommand from '@/components/lookup/LookupInputCommand';
import { cityGetAction } from '@/actions/app';
import SwiperCardsExperts from '@/components/SwiperCardsExperts';
import Heading from '@/components/Heading';
import SwiperCardsTestimonial from '@/components/SwiperCardsTestimonial';
import Counters from '@/components/Counters';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: app_name + ' - ' + t('Home'),
  };
}

export default async function Home() {
  const t = await getTranslations();
  const city = await cityGetAction();
  const services = await fetchServices();
  const popularServices = services.filter(service => service.isPopular);
  return (
    <main id='top'>
      <SiteHeader />
      {/* Hero section */}
      <section className="w-full py-20 md:py-40 flex flex-col justify-center items-center bg-tertiary bg-[url('/assets/hero-mobile.jpg')] md:bg-[url('/assets/hero2.jpg')] bg-cover bg-no-repeat bg-[position:20%_20%]">
        <h2 className='text-2xl md:text-4xl font-semibold mb-4 px-4 text-center text-brand'>
          <TypeWriter
            words={[
              'Finding trusted experts',
              'Quality service',
              'Transparent pricing',
            ]}
            className='text-white'
          />
          <br />

          {t('made easy!')}
        </h2>
        <p className='text-white max-w-2xl mx-auto mb-10 text-center px-4'>
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
          className='mt-4 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
          variant='outline'
        >
          <Link href='/services'>{t('Explore all services')}</Link>
        </Button>
      </section>

      <section className='w-full py-20 flex flex-col justify-center items-center bg-tertiary gap-8 overflow-hidden'>
        <Heading
          head={t('Three steps to get on-site service')}
          subHead={t(
            'Simple and efficient process to connect you with experts',
          )}
        />
        <div className='flex gap-4 w-full px-4 items-center justify-center flex-wrap'>
          <div className='flex items-center justify-center flex-col gap-2 w-[200px]'>
            <div className='size-34 p-4 rounded-full bg-white shadow-md flex items-center justify-center text-brand'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='50'
                height='50'
                color='currentColor'
                fill='none'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M13 17.6C13 15.0595 15.0595 13 17.6 13C20.1405 13 22.2 15.0595 22.2 17.6C22.2 18.5077 21.9371 19.354 21.4833 20.0669L22.7077 21.2935C23.0979 21.6844 23.0974 22.3175 22.7065 22.7077C22.3156 23.0979 21.6825 23.0974 21.2923 22.7065L20.0695 21.4816C19.3561 21.9364 18.5088 22.2 17.6 22.2C15.0595 22.2 13 20.1405 13 17.6ZM17.6 15C16.1641 15 15 16.1641 15 17.6C15 19.0359 16.1641 20.2 17.6 20.2C19.0359 20.2 20.2 19.0359 20.2 17.6C20.2 16.1641 19.0359 15 17.6 15Z'
                  fill='currentColor'
                ></path>
                <path
                  opacity='0.4'
                  d='M21.6396 8.33596C21.7271 8.4218 21.7297 8.55822 21.7349 8.83105C21.75 9.61687 21.75 10.4848 21.75 11.4425V11.5572C21.75 11.6261 21.75 11.6946 21.75 11.7626C21.75 12.3249 21.7499 12.606 21.5998 12.6926C21.4496 12.7791 21.1839 12.6253 20.6525 12.3175C19.7547 11.7976 18.7121 11.5 17.6 11.5C14.2311 11.5 11.5 14.2311 11.5 17.6C11.5 18.7121 11.7976 19.7547 12.3175 20.6525C12.6253 21.1839 12.7791 21.4496 12.6926 21.5998C12.606 21.7499 12.3249 21.75 11.7626 21.75C11.6946 21.75 11.6261 21.75 11.5572 21.75H11.4428C9.2521 21.75 7.53144 21.75 6.18802 21.5694C4.81137 21.3843 3.71911 20.9973 2.86091 20.1391C2.00272 19.2809 1.61568 18.1886 1.43059 16.812C1.24998 15.4686 1.24999 13.7479 1.25 11.5572V11.4428C1.24999 10.485 1.24999 9.61694 1.26508 8.83105C1.27032 8.55822 1.27294 8.4218 1.36045 8.33596C1.44795 8.25012 1.5856 8.25012 1.8609 8.25012H21.1391C21.4144 8.25012 21.552 8.25012 21.6396 8.33596Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M11.4432 1.25H11.5575C13.7482 1.24999 15.4689 1.24998 16.8123 1.43059C18.189 1.61568 19.2812 2.00272 20.1394 2.86091C20.9976 3.71911 21.3847 4.81137 21.5697 6.18802C21.5981 6.39867 21.6122 6.50399 21.5687 6.58807C21.547 6.63001 21.5132 6.66865 21.4745 6.69577C21.397 6.75012 21.2871 6.75012 21.0675 6.75012H1.93319C1.71354 6.75012 1.60371 6.75012 1.52618 6.69577C1.4875 6.66865 1.45371 6.63001 1.43199 6.58807C1.38845 6.50399 1.40261 6.39867 1.43093 6.18802C1.61602 4.81137 2.00306 3.71911 2.86125 2.86091C3.71945 2.00272 4.81171 1.61568 6.18836 1.43059C7.53178 1.24998 9.25247 1.24999 11.4432 1.25Z'
                  fill='currentColor'
                ></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H7C7.41421 11.25 7.75 11.5858 7.75 12C7.75 12.4142 7.41421 12.75 7 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12ZM9.25 12C9.25 11.5858 9.58579 11.25 10 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75H10C9.58579 12.75 9.25 12.4142 9.25 12ZM5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H7C7.41421 15.25 7.75 15.5858 7.75 16C7.75 16.4142 7.41421 16.75 7 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16Z'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
            <h3 className='mt-2 text-center text-md text-black'>
              {t('Search and select a service or specialist')}
            </h3>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              color='currentColor'
              fill='none'
              className='text-brand'
            >
              <path
                opacity='0.4'
                d='M11.9428 1.75C14.1335 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50271 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.86646 22.25 12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.1335 22.25 11.9428 22.25H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50271 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.1335 1.75 11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50271 4.21911 3.36091 3.36091C4.21911 2.50271 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75Z'
                fill='currentColor'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.9473 6.10558C13.2861 6.27497 13.5001 6.62123 13.5001 7.00001V17C13.5001 17.5523 13.0523 18 12.5001 18C11.9478 18 11.5001 17.5523 11.5001 17V9.00001L11.1001 9.30001C10.6582 9.63138 10.0314 9.54183 9.70006 9.10001C9.36869 8.65818 9.45823 8.03138 9.90006 7.70001L11.9001 6.20001C12.2031 5.97274 12.6085 5.93619 12.9473 6.10558Z'
                fill='currentColor'
              ></path>
            </svg>
          </div>
          <div className='flex items-center justify-center flex-col gap-2 w-[200px]'>
            <div className='size-34 p-4 rounded-full bg-white shadow-md flex items-center justify-center text-brand'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='50'
                height='50'
                color='currentColor'
                fill='none'
              >
                <path
                  opacity='0.4'
                  d='M12.0578 2.99994H12.0577H9.94249H9.94246C8.34087 2.99992 7.06231 2.9999 6.05968 3.13471C5.02343 3.27403 4.17036 3.56992 3.49522 4.24506C2.82009 4.92019 2.5242 5.77326 2.38487 6.80951C2.25007 7.81215 2.25009 9.0907 2.25011 10.6923V10.6923V15.0576C2.25009 16.6591 2.25007 17.9378 2.38487 18.9404C2.52422 19.9765 2.82017 20.8298 3.49522 21.5048C4.17033 22.1798 5.02352 22.4759 6.05968 22.6152C7.06231 22.75 8.34092 22.75 9.94249 22.7499H12.0577C12.659 22.7499 13.215 22.7463 13.7276 22.7392C13.4804 22.249 13.2799 22.0195 13.1847 21.9267C12.216 21.6755 11.5003 20.7985 11.5001 19.7509C11.5001 18.5083 12.5075 17.5009 13.7501 17.5009C14.0331 17.5009 14.3682 17.5693 14.5392 17.6181C14.7724 17.6848 15.0244 17.786 15.2862 17.9277C15.7846 17.1638 16.4347 16.2817 17.1759 15.5302C17.8492 14.8476 18.7117 14.1477 19.7501 13.7245V10.6923V10.6923C19.7501 9.09069 19.7501 7.81213 19.6153 6.80951C19.476 5.77326 19.1801 4.92019 18.505 4.24506C17.8299 3.56993 16.9768 3.27403 15.9405 3.13471C14.9379 2.9999 13.6593 2.99992 12.0578 2.99994Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M11.0001 14.2499C11.4143 14.2499 11.7501 14.5857 11.7501 14.9999C11.7501 15.4142 11.4143 15.7499 11.0001 15.7499H7.00011C6.58589 15.7499 6.25011 15.4142 6.25011 14.9999C6.25011 14.5857 6.58589 14.2499 7.00011 14.2499H11.0001ZM15.0001 10.2499C15.4143 10.2499 15.7501 10.5857 15.7501 10.9999C15.7501 11.4142 15.4143 11.7499 15.0001 11.7499H7.00011C6.58589 11.7499 6.25011 11.4142 6.25011 10.9999C6.25011 10.5857 6.58589 10.2499 7.00011 10.2499H15.0001Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M21.6925 15.416C21.5081 14.8955 20.9367 14.6232 20.4162 14.8076C19.5127 15.1276 18.7223 15.7414 18.0656 16.4072C17.4022 17.0797 16.8242 17.8568 16.3537 18.5781C16.0781 19.0005 15.8354 19.4113 15.6291 19.7802C15.3908 19.5201 15.1567 19.3192 14.9298 19.1679C14.6554 18.985 14.4043 18.8787 14.1964 18.8193C14.0934 18.7899 13.8792 18.7499 13.7502 18.7499C13.1979 18.7499 12.7502 19.1977 12.7502 19.7499C12.7502 20.2696 13.1466 20.6964 13.6535 20.7451C13.6738 20.7517 13.7322 20.7732 13.8205 20.832C14.0197 20.9648 14.4149 21.3158 14.8556 22.1972C15.0293 22.5445 15.3884 22.7602 15.7765 22.7499C16.1647 22.7396 16.5121 22.5043 16.6671 22.1484C16.7278 22.019 16.9064 21.6397 17.0246 21.4091C17.2615 20.9466 17.6041 20.3223 18.0285 19.6718C18.4549 19.0182 18.9508 18.3575 19.4894 17.8115C20.0348 17.2585 20.5759 16.8723 21.0841 16.6923C21.6046 16.5079 21.8769 15.9365 21.6925 15.416Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M5.75011 2.20448V4.84994C5.75011 5.347 6.17747 5.74994 6.70465 5.74994C7.23183 5.74994 7.6592 5.347 7.6592 4.84994V2.20448C7.6592 1.6773 7.23183 1.24994 6.70465 1.24994C6.17747 1.24994 5.75011 1.6773 5.75011 2.20448Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M10.0456 2.20449V4.84994C10.0456 5.347 10.4729 5.74994 11.0001 5.74994C11.5273 5.74994 11.9547 5.347 11.9547 4.84994V2.20448C11.9547 1.6773 11.5273 1.24994 11.0001 1.24994C10.4729 1.24994 10.0456 1.6773 10.0456 2.20449Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M14.341 2.20449V4.84994C14.341 5.347 14.7684 5.74994 15.2956 5.74994C15.8227 5.74994 16.2501 5.347 16.2501 4.84994V2.20448C16.2501 1.6773 15.8227 1.24994 15.2956 1.24994C14.7684 1.24994 14.341 1.6773 14.341 2.20449Z'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
            <h3 className='mt-2 text-center text-md text-black'>
              {t('Completing the order process')}
            </h3>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              color='currentColor'
              fill='none'
              className='text-brand'
            >
              <path
                opacity='0.4'
                d='M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50271 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.86646 22.25 12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572C9.86646 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50271 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572C1.74999 9.86647 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50271 4.21911 3.36091 3.36091C4.21911 2.50271 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.86647 1.74999 12.0572 1.75Z'
                fill='currentColor'
              ></path>
              <path
                d='M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 11.4907 14.9904 12.725 14.0027 13.6024C12.9742 14.516 11.731 15.2528 10.8168 15.735C10.6781 15.8081 10.5546 15.898 10.4482 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17C8 15.6808 8.78906 14.5434 9.88371 13.966C10.7389 13.5149 11.8205 12.8657 12.6745 12.1071C13.5694 11.3122 14 10.5879 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 10.5523 9.55228 11 9 11C8.44772 11 8 10.5523 8 10Z'
                fill='currentColor'
              ></path>
            </svg>
          </div>
          <div className='flex items-center justify-center flex-col gap-2 w-[200px]'>
            <div className='size-34 p-4 rounded-full bg-white shadow-md flex items-center justify-center text-brand'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='50'
                height='50'
                color='currentColor'
                fill='none'
              >
                <path
                  opacity='0.4'
                  d='M10.5656 1.80358C10.9816 1.48611 11.4388 1.25 12 1.25C12.5612 1.25 13.0184 1.48611 13.4344 1.80358C13.8241 2.10089 14.2539 2.53075 14.7568 3.03368L14.7922 3.06904C15.3067 3.58361 15.7553 3.78626 16.4479 3.78626C16.5345 3.78626 16.6442 3.78315 16.7682 3.77964C17.083 3.77072 17.49 3.75919 17.8456 3.78921C18.3672 3.83325 19.0205 3.97339 19.5187 4.46747C20.0207 4.96533 20.1643 5.62129 20.2097 6.14615C20.2407 6.50496 20.2292 6.91507 20.2203 7.2321L20.2203 7.23236C20.2168 7.35593 20.2137 7.46534 20.2137 7.55206C20.2137 8.00288 20.2638 8.25468 20.3507 8.45354C20.4399 8.65779 20.5973 8.87416 20.931 9.20784L20.9664 9.24322C21.4693 9.74607 21.8991 10.1759 22.1964 10.5655C22.5139 10.9816 22.75 11.4388 22.75 12C22.75 12.5611 22.5139 13.0183 22.1964 13.4344C21.8991 13.8242 21.4691 14.2541 20.9661 14.7571L20.9309 14.7922C20.5973 15.1258 20.4399 15.3422 20.3507 15.5464C20.2638 15.7453 20.2137 15.9971 20.2137 16.4479C20.2137 16.5346 20.2168 16.644 20.2203 16.7676L20.2203 16.7679C20.2292 17.0849 20.2407 17.495 20.2097 17.8539C20.1643 18.3787 20.0207 19.0347 19.5186 19.5326C19.0204 20.0266 18.3671 20.1667 17.8456 20.2107C17.49 20.2408 17.083 20.2292 16.7682 20.2203C16.6442 20.2168 16.5345 20.2137 16.4479 20.2137C16.0067 20.2137 15.7587 20.2581 15.5635 20.3386C15.3685 20.4191 15.1599 20.5632 14.8458 20.8773C14.7787 20.9445 14.6902 21.0392 14.5882 21.1486C14.3583 21.3951 14.0593 21.7155 13.7801 21.9596C13.3563 22.33 12.7485 22.75 12 22.75C11.2516 22.75 10.6437 22.33 10.22 21.9596C9.94071 21.7155 9.64176 21.3951 9.4118 21.1486L9.41179 21.1486L9.41176 21.1486C9.30976 21.0392 9.22134 20.9445 9.15424 20.8774C8.84006 20.5632 8.63147 20.4191 8.43645 20.3386C8.24126 20.2581 7.99328 20.2137 7.55206 20.2137C7.4655 20.2137 7.35581 20.2168 7.23179 20.2203C6.91703 20.2292 6.50997 20.2408 6.15443 20.2107C5.63287 20.1667 4.97961 20.0266 4.48139 19.5326C3.97933 19.0347 3.83569 18.3787 3.79029 17.8539C3.75926 17.495 3.7708 17.0849 3.77972 16.7679C3.7832 16.6442 3.78628 16.5347 3.78628 16.4479C3.78628 15.9971 3.73619 15.7453 3.64932 15.5464C3.56011 15.3422 3.40272 15.1258 3.06906 14.7922L3.03395 14.7571C2.53091 14.2541 2.10095 13.8242 1.80358 13.4344C1.48613 13.0183 1.25001 12.5611 1.25 12C1.25001 11.4388 1.48612 10.9816 1.80358 10.5655C2.10089 10.1759 2.53075 9.74606 3.03367 9.24319L3.06902 9.20784C3.58371 8.69315 3.78628 8.24448 3.78628 7.55206C3.78628 7.46549 3.78317 7.35581 3.77966 7.23181L3.77966 7.23178C3.77075 6.91701 3.75922 6.50995 3.78923 6.15439C3.83327 5.63282 3.9734 4.97955 4.46745 4.48134C4.96532 3.97929 5.62128 3.83566 6.14615 3.79027C6.50497 3.75924 6.91509 3.77078 7.23212 3.7797C7.35579 3.78318 7.4653 3.78626 7.55208 3.78626C8.24449 3.78626 8.69316 3.5837 9.20782 3.06904L9.24319 3.03367C9.74606 2.53075 10.1759 2.10089 10.5656 1.80358Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M22.9271 1.62507C23.1343 2.13701 22.8872 2.72 22.3753 2.92721C21.3311 3.34986 20.2045 4.2335 19.0747 5.41127C17.9569 6.57656 16.8958 7.96605 15.9724 9.31511C15.0509 10.6612 14.2789 11.949 13.7368 12.9012C13.4459 13.4122 13.1593 13.9267 12.8928 14.4509C12.718 14.7963 12.3591 15.0107 11.9721 14.9999C11.5851 14.989 11.2391 14.7558 11.0839 14.4011C10.2773 12.5573 9.41163 11.828 8.86766 11.5335C8.44942 11.307 8.16586 11.302 8.10946 11.3025L8.10348 11.3026C7.56881 11.3585 7.08269 10.9799 7.00933 10.4434C6.9345 9.89626 7.31742 9.39201 7.86461 9.31718C8.53036 9.22812 9.244 9.46282 9.82005 9.77477C10.5271 10.1577 11.2899 10.8129 12.0059 11.8992C12.5664 10.9151 13.3651 9.5833 14.322 8.18542C15.2809 6.78448 16.411 5.29897 17.6314 4.02675C18.8398 2.76703 20.1985 1.65067 21.6249 1.07332C22.1369 0.866105 22.7198 1.11313 22.9271 1.62507Z'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
            <h3 className='mt-2 text-center text-md text-black'>
              {t('Getting on-site service with ease')}
            </h3>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              color='currentColor'
              fill='none'
              className='text-brand'
            >
              <path
                opacity='0.4'
                d='M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50271 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.86646 22.25 12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572C9.86646 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50271 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.1335 1.75 11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50271 4.21911 3.36091 3.36091C4.21911 2.50271 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.86647 1.74999 12.0572 1.75Z'
                fill='currentColor'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8 9.5C8 7.567 9.567 6 11.5 6H12.5C14.433 6 16 7.567 16 9.5C16 10.4793 15.5978 11.3647 14.9495 12C15.5978 12.6353 16 13.5207 16 14.5C16 16.433 14.433 18 12.5 18H11.5C9.567 18 8 16.433 8 14.5C8 13.9477 8.44772 13.5 9 13.5C9.55228 13.5 10 13.9477 10 14.5C10 15.3284 10.6716 16 11.5 16H12.5C13.3284 16 14 15.3284 14 14.5C14 13.6716 13.3284 13 12.5 13H11.5C10.9477 13 10.5 12.5523 10.5 12C10.5 11.4477 10.9477 11 11.5 11H12.5C13.3284 11 14 10.3284 14 9.5C14 8.67157 13.3284 8 12.5 8H11.5C10.6716 8 10 8.67157 10 9.5C10 10.0523 9.55228 10.5 9 10.5C8.44772 10.5 8 10.0523 8 9.5Z'
                fill='currentColor'
              ></path>
            </svg>
          </div>
        </div>
      </section>

      <section className='w-full py-20 flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-40 overflow-hidden'>
        <Heading
          head={t('What Our Customers Say')}
          subHead={t('Real experiences from real people')}
        />
        <div>
          <SwiperCardsTestimonial />
        </div>
      </section>

      <section className='w-full py-20 flex flex-col justify-center items-center bg-tertiary gap-8 overflow-hidden'>
        <Heading
          head={t('Why thousands trust ServePortal')}
          subHead={t(
            'From verified professionals to round-the-clock support, ServePortal makes getting on-site service quick and easy.',
          )}
        />
        <Counters />
      </section>

      <section className='w-full py-20 flex flex-col justify-center items-center gap-8 overflow-hidden'>
        <Heading
          head={t('Trending professionals in {city}', { city })}
          subHead={t(
            'Explore our diverse range of skilled professionals ready to assist you with various services in your locality.',
          )}
        />
        <SwiperCardsExperts />
      </section>

      {/* Cities of operation */}
      <section className='w-full py-12 flex flex-col justify-center items-center gap-8 bg-tertiary overflow-hidden'>
        <Heading
          head={t('ServePortal in your city')}
          subHead={t(
            'Discover trusted professionals available across multiple Hungarian cities — bringing quality services closer to you.',
          )}
        />
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
