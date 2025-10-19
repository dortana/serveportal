import { getTranslations } from 'next-intl/server';
import React from 'react';

const Counters = async () => {
  const t = await getTranslations();
  const stats = [
    { number: '1,000+', label: t('Verified Experts') },
    { number: '100+', label: t('Services Offered') },
    { number: '10+', label: t('Cities Served') },
    { number: '24/7', label: t('Support Availability') },
  ];
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
        {stats.map((stat, index) => (
          <div key={index} className='text-center'>
            <div className='text-3xl lg:text-4xl font-bold text-brand mb-2'>
              {stat.number}
            </div>
            <div className='text-sm text-muted-foreground font-medium'>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counters;
