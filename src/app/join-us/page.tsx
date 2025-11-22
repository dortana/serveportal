import React from 'react';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';
import ExpertSignUpForm from '@/components/forms/ExpertSignUpForm';

const JoinUsPage = async () => {
  const t = await getTranslations();
  return (
    <div>
      <SiteHeader />
      <div className='h-fit bg-background'>
        {/* Hero Section */}
        <section className='pt-20 lg:pt-32'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center max-w-4xl mx-auto'>
              <Badge variant='secondary' className='mb-6 text-sm font-medium'>
                {t('Join ServePortal as a Local Expert')}
              </Badge>
              <h1 className='text-4xl lg:text-6xl font-bold text-foreground mb-6'>
                {t('Join our growing network of professional')}{' '}
                <span className='text-brand block'>{t('Solvers')}</span>
              </h1>
              <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 max-md:text-base'>
                {t(
                  'ServePortal helps you reach more customers, get more jobs, and earn more money. Grow your business, work on your own schedule, and build a strong local reputation — just fill the form below to get started.',
                )}
              </p>
            </div>
          </div>
        </section>
        <section className='flex items-center justify-center w-full mb-20'>
          <ExpertSignUpForm />
        </section>
      </div>
      <SiteFooter />
    </div>
  );
};

export default JoinUsPage;
