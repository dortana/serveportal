'use client';
import React from 'react';
import LocationIcon from './icons/LocationIcon';
import { cn } from '@/lib/utils';

const CitySelector = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('flex items-center gap-1 cursor-pointer', className)}
      onClick={() => console.log('select city')}
    >
      <LocationIcon className='size-5' />
      <span className='text-sm'>Budapest</span>
    </div>
  );
};

export default CitySelector;
