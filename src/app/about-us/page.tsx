import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { app_name } from '@/lib/data';
import Counters from '@/components/Counters';

export default async function AboutUsPage() {
  const t = await getTranslations();
  const values = [
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          color='#000000'
          fill='none'
          className='text-black h-6 w-6'
        >
          <path
            d='M19 9.62069C19 12.1999 17.7302 14.1852 15.7983 15.4917C15.3483 15.796 15.1233 15.9482 15.0122 16.1212C14.9012 16.2942 14.8633 16.5214 14.7876 16.9757L14.7287 17.3288C14.5957 18.127 14.5292 18.526 14.2494 18.763C13.9697 19 13.5651 19 12.7559 19H10.1444C9.33528 19 8.93069 19 8.65095 18.763C8.3712 18.526 8.30469 18.127 8.17166 17.3288L8.11281 16.9757C8.03734 16.5229 7.99961 16.2965 7.88968 16.1243C7.77976 15.9521 7.55428 15.798 7.10332 15.4897C5.1919 14.1832 4 12.1986 4 9.62069C4 5.4119 7.35786 2 11.5 2C12.0137 2 12.5153 2.05248 13 2.15244'
            stroke='#000000'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16.5 2L16.7579 2.69703C17.0961 3.61102 17.2652 4.06802 17.5986 4.40139C17.932 4.73477 18.389 4.90387 19.303 5.24208L20 5.5L19.303 5.75792C18.389 6.09613 17.932 6.26524 17.5986 6.59861C17.2652 6.93198 17.0961 7.38898 16.7579 8.30297L16.5 9L16.2421 8.30297C15.9039 7.38898 15.7348 6.93198 15.4014 6.59861C15.068 6.26524 14.611 6.09613 13.697 5.75792L13 5.5L13.697 5.24208C14.611 4.90387 15.068 4.73477 15.4014 4.40139C15.7348 4.06802 15.9039 3.61102 16.2421 2.69703L16.5 2Z'
            stroke='#000000'
            strokeWidth='1.5'
            strokeLinejoin='round'
          />
          <path
            d='M13.5 19V20C13.5 20.9428 13.5 21.4142 13.2071 21.7071C12.9142 22 12.4428 22 11.5 22C10.5572 22 10.0858 22 9.79289 21.7071C9.5 21.4142 9.5 20.9428 9.5 20V19'
            stroke='#000000'
            strokeWidth='1.5'
            strokeLinejoin='round'
          />
        </svg>
      ),
      title: t('Innovation'),
      description: t(
        'We use modern technology to make finding, hiring, and managing experts effortless — saving time and stress for everyone.',
      ),
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          color='#000000'
          fill='none'
          className='text-black h-6 w-6'
        >
          <path
            d='M10 12.5C10 12.5 10.5 12.5 11 13.5C11 13.5 12.5882 11 14 10.5'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
          ></path>
          <path
            d='M21 11.1833V8.28029C21 6.64029 21 5.82028 20.5959 5.28529C20.1918 4.75029 19.2781 4.49056 17.4507 3.9711C16.2022 3.6162 15.1016 3.18863 14.2223 2.79829C13.0234 2.2661 12.424 2 12 2C11.576 2 10.9766 2.2661 9.77771 2.79829C8.89839 3.18863 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
          ></path>
        </svg>
      ),
      title: t('Reliability'),
      description: t(
        'We verify every professional to ensure consistent quality, accountability, and trust in every service delivered.',
      ),
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          color='#000000'
          fill='none'
          className='text-black h-6 w-6'
        >
          <path
            d='M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M16 4C17.6568 4 19 5.34315 19 7C19 8.22309 18.268 9.27523 17.2183 9.7423'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M13.7143 14H10.2857C7.91876 14 5.99998 15.9188 5.99998 18.2857C5.99998 19.2325 6.76749 20 7.71426 20H16.2857C17.2325 20 18 19.2325 18 18.2857C18 15.9188 16.0812 14 13.7143 14Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M17.7143 13C20.0812 13 22 14.9188 22 17.2857C22 18.2325 21.2325 19 20.2857 19'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M8 4C6.34315 4 5 5.34315 5 7C5 8.22309 5.73193 9.27523 6.78168 9.7423'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M3.71429 19C2.76751 19 2 18.2325 2 17.2857C2 14.9188 3.91878 13 6.28571 13'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </svg>
      ),
      title: t('Accessibility'),
      description: t(
        'We’re building a platform where everyone, everywhere, can access the right help — from small home projects to large construction needs.',
      ),
    },
  ];

  const teamMembers = [
    {
      name: 'Alex Chen',
      position: 'CEO & Founder',
      bio: 'Former Goldman Sachs analyst with 10+ years in fintech. Passionate about democratizing financial tools.',
      initials: 'AC',
    },
    {
      name: 'Sarah Mitchell',
      position: 'CTO',
      bio: 'Tech leader with expertise in scalable financial systems and machine learning applications.',
      initials: 'SM',
    },
    {
      name: 'David Rodriguez',
      position: 'Head of Product',
      bio: 'Product strategist focused on user experience and translating complex financial concepts into intuitive interfaces.',
      initials: 'DR',
    },
  ];

  const timeline = [
    {
      year: '2024',
      title: t('Company Founded'),
      description:
        'ServePortal was founded in Budapest with a mission to make finding trusted experts simple, fast, and reliable for everyone in Hungary.',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          color='#fff'
          fill='none'
          className='h-8 w-8 text-white'
        >
          <circle
            cx='12'
            cy='15.5'
            r='6.5'
            stroke='currentColor'
            strokeWidth='1.5'
          ></circle>
          <path
            d='M9 9.5L5.5 2'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M15 9.5L18.5 2'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M15 2L14 4.5'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M12.5 9L9.5 2'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M11 18H12M12 18H13M12 18V13L11 13.5'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </svg>
      ),
    },
    {
      year: '2025',
      title: t('Platform Launch'),
      description:
        'We launched our first version, connecting users with verified professionals in cleaning, construction, and home services — quickly building a strong community of satisfied users.',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          color='#fff'
          fill='none'
          className='h-8 w-8 text-white'
        >
          <path
            d='M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
          ></path>
          <path
            d='M7.99707 16.999C11.5286 16.999 18.9122 15.5348 18.6979 6.43269M16.4886 8.04302L18.3721 6.14612C18.5656 5.95127 18.8798 5.94981 19.0751 6.14286L20.9971 8.04302'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </svg>
      ),
    },
    {
      year: '2026',
      title: t('Smart Matching & Growth'),
      description:
        'Introduced intelligent matching and review systems to help users find the right professional based on skill, location, and reliability — solidifying our position as Hungary’s go-to service platform.',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          color='#fff'
          fill='none'
          className='h-8 w-8 text-white'
        >
          <path
            d='M18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284Z'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8 2V4M16 2V4M12 2V4M8 20V22M12 20V22M16 20V22M22 16H20M4 8H2M4 16H2M4 12H2M22 8H20M22 12H20'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.4802 7.86193C11.6587 7.37936 12.3413 7.37936 12.5198 7.86193L13.3202 10.0248C13.4325 10.3283 13.6717 10.5675 13.9752 10.6798L16.1381 11.4802C16.6206 11.6587 16.6206 12.3413 16.1381 12.5198L13.9752 13.3202C13.6717 13.4325 13.4325 13.6717 13.3202 13.9752L12.5198 16.1381C12.3413 16.6206 11.6587 16.6206 11.4802 16.1381L10.6798 13.9752C10.5675 13.6717 10.3283 13.4325 10.0248 13.3202L7.86193 12.5198C7.37936 12.3413 7.37936 11.6587 7.86193 11.4802L10.0248 10.6798C10.3283 10.5675 10.5675 10.3283 10.6798 10.0248L11.4802 7.86193Z'
            stroke='#fff'
            strokeWidth='1.5'
          />
        </svg>
      ),
    },
    {
      year: '2027',
      title: t('European Expansion (Upcoming)'),
      description:
        'Our next step is to bring ServePortal to the rest of Europe — empowering more people and professionals through trust, technology, and simplicity.',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          color='#fff'
          fill='none'
          className='h-8 w-8 text-white'
        >
          <path
            d='M12.5 19L12.5 22'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.5 22H14.5'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle
            cx='7'
            cy='7'
            r='7'
            transform='matrix(-1 0 0 1 20.5 2)'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M8.5 4C9.15431 4.0385 9.49236 4.35899 10.0735 4.97301C11.1231 6.08206 12.1727 6.1746 12.8724 5.80492C13.922 5.2504 13.04 4.35221 14.2719 3.86409C15.0748 3.54595 15.1868 2.68026 14.7399 2'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinejoin='round'
          />
          <path
            d='M20 10C18.5 10 18.2338 11.2468 17 11C14.5 10.5 13.7916 11.0589 13.7916 12.2511C13.7916 13.4432 13.7916 13.4432 13.2717 14.3373C12.9335 14.9189 12.8153 15.5004 13.4894 16'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinejoin='round'
          />
          <path
            d='M6.5 2C4.64864 3.79995 3.5 6.3082 3.5 9.08251C3.5 14.5598 7.97715 19 13.5 19C16.2255 19 18.6962 17.9187 20.5 16.165'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <SiteHeader />
      <div className='h-fit bg-background'>
        {/* Hero Section */}
        <section className='py-20 lg:py-32 bg-muted/50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center max-w-4xl mx-auto'>
              <Badge
                variant='secondary'
                className='mb-6 text-sm font-medium bg-white border-brand'
              >
                {t('About') + ' ' + app_name}
              </Badge>
              <h1 className='text-4xl lg:text-6xl font-bold text-foreground mb-6'>
                {t('Your gateway to reliable')}
                <span className='text-brand block'>{t('Experts')}</span>
              </h1>
              <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8'>
                {t(
                  'ServePortal makes finding trusted experts simple and stress-free. From cleaning to construction, we connect you with verified professionals in just a few clicks. Built on reliability and transparency, ServePortal helps you get things done — efficiently, locally, and with confidence.',
                )}
              </p>
              <div className='flex flex-wrap gap-4 justify-center'>
                <Button asChild>
                  <Link href='/auth/login'>
                    {t('Find Your Expert')}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width='24'
                      height='24'
                      color='#fff'
                      fill='none'
                      className='size-4'
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
                </Button>

                <Button asChild variant='outline'>
                  <Link href='/'>{t('Learn More')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className='py-16 bg-muted/50'>
          <Counters />
        </section>

        {/* Mission & Values Section */}
        <section className='py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-6'>
                {t('Our Mission & Values')}
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                {t(
                  'We believe in democratizing financial management through technology, making sophisticated tools accessible to everyone.',
                )}
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card
                    key={index}
                    className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300'
                  >
                    <CardHeader>
                      <div className='w-12 h-12 bg-tertiary text-black rounded-lg flex items-center justify-center mb-4'>
                        {IconComponent}
                      </div>
                      <CardTitle className='text-xl'>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground leading-relaxed'>
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Story Section */}
        <section className='py-20 bg-muted/50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid lg:grid-cols-2 gap-16 items-center'>
              <div>
                <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-8'>
                  {t('Our Story')}
                </h2>
                <div className='space-y-6 text-muted-foreground leading-relaxed'>
                  <p className='text-lg'>
                    {t(
                      'Founded in Budapest in 2024, ServePortal was created to make finding trusted experts simple, fast, and reliable. We noticed how difficult it was for people to locate skilled professionals they could truly depend on — whether for home repairs, construction, or cleaning services.',
                    )}
                  </p>
                  <p>
                    {t(
                      'Our platform bridges that gap by connecting users with verified professionals across various fields. With just a few clicks, anyone can find the right expert, compare options, and get the job done confidently.',
                    )}
                  </p>
                  <p>
                    {t(
                      'Today, ServePortal empowers thousands of users and professionals to work together more efficiently — helping communities thrive through trust, transparency, and technology.',
                    )}
                  </p>
                </div>
                <div className='mt-8 flex items-center gap-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                    color='#12b468'
                    fill='none'
                    className='h-5 w-5 text-green-600'
                  >
                    <path
                      d='M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10'
                      stroke='#12b468'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    ></path>
                    <path
                      d='M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.0588 6.83333 22 5'
                      stroke='#12b468'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </svg>

                  <span className='text-sm font-medium text-foreground'>
                    {t('Trusted by 50,000+ users')}
                  </span>
                </div>
              </div>
              <div className='lg:pl-8'>
                <div className='bg-white rounded-2xl p-8 h-96 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='w-24 h-24 bg-brand rounded-full flex items-center justify-center mx-auto mb-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='24'
                        height='24'
                        color='#fff'
                        fill='none'
                        className='h-12 w-12 text-white'
                      >
                        <path
                          d='M14 21H16M14 21C13.1716 21 12.5 20.3284 12.5 19.5V17L12 17M14 21H10M10 21H8M10 21C10.8284 21 11.5 20.3284 11.5 19.5V17L12 17M12 17V21'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M16 3H8C5.17157 3 3.75736 3 2.87868 3.87868C2 4.75736 2 6.17157 2 9V11C2 13.8284 2 15.2426 2.87868 16.1213C3.75736 17 5.17157 17 8 17H16C18.8284 17 20.2426 17 21.1213 16.1213C22 15.2426 22 13.8284 22 11V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3Z'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M16 8L13.5 10.5C13.2274 10.7726 13.0911 10.9089 12.944 10.9818C12.6642 11.1204 12.3358 11.1204 12.056 10.9818C11.9089 10.9089 11.7726 10.7726 11.5 10.5C11.2274 10.2274 11.0911 10.0911 10.944 10.0182C10.6642 9.87955 10.3358 9.87955 10.056 10.0182C9.90894 10.0911 9.77262 10.2274 9.5 10.5L7 13M14 7H15.7143C16.3204 7 16.6234 7 16.8117 7.18829C17 7.37658 17 7.67962 17 8.28571V10'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                      </svg>
                    </div>
                    <h3 className='text-xl font-semibold text-foreground mb-2'>
                      {t('Professional Empowerment')}
                    </h3>
                    <p className='text-muted-foreground'>
                      {t(
                        'Helping skilled experts reach new clients and grow their business.',
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className='py-20 bg-gray-100'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-6'>
                {t('Meet Our Team')}
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                {t(
                  'Our diverse team of innovators, engineers, and creators work together to make finding trusted service experts simple and reliable.',
                )}
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white'
                >
                  <CardHeader className='text-center'>
                    <div className='w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-4'>
                      <span className='text-white font-bold text-lg'>
                        {member.initials}
                      </span>
                    </div>
                    <CardTitle className='text-xl'>{member.name}</CardTitle>
                    <Badge variant='secondary' className='w-fit mx-auto'>
                      {member.position}
                    </Badge>
                  </CardHeader>
                  <CardContent className='text-center'>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline Section */}
        <section className='py-20 bg-muted/50'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-6'>
                Our Journey
              </h2>
              <p className='text-lg text-muted-foreground'>
                {t(
                  'Key milestones in ServePortal’s evolution — from a local startup in Hungary to a growing platform on its way to European expansion.',
                )}
              </p>
            </div>

            <div className='space-y-8'>
              {timeline.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <Card key={index} className='border-0 shadow-lg'>
                    <CardContent className='p-8'>
                      <div className='flex items-start gap-6'>
                        <div className='flex-shrink-0'>
                          <div className='w-16 h-16 bg-brand rounded-full flex items-center justify-center'>
                            {IconComponent}
                          </div>
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-4 mb-3'>
                            <Badge
                              variant='secondary'
                              className='font-semibold'
                            >
                              {event.year}
                            </Badge>
                            <h3 className='text-xl font-semibold text-foreground'>
                              {event.title}
                            </h3>
                          </div>
                          <p className='text-muted-foreground leading-relaxed'>
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <Separator className='my-0' />

        {/* Call to Action Section */}
        <section className='py-20 bg-brand'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='text-3xl lg:text-4xl font-bold text-white mb-6'>
              {t('Need a Hand? We’ve Got the Experts.')}
            </h2>
            <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
              {t(
                'From home repairs to construction, discover trusted professionals on ServePortal — all in one place.',
              )}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button asChild className='bg-white text-black hover:bg-white'>
                <Link href='/auth/login'>
                  {t('Find Your Expert')}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                    color='currentColor'
                    fill='none'
                    className='size-4'
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
              </Button>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
