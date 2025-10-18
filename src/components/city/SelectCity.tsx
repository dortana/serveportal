'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import CircleCheckIcon from '../icons/CircleCheckIcon';
import { citySetAction } from '@/actions/app';

interface SelectCityProps {
  selected: boolean;
  city: string;
}
const SelectCity = (props: SelectCityProps) => {
  const { selected, city } = props;

  return (
    <div
      className={cn(
        'flex-1 h-5 hover:bg-tertiary p-4 flex gap-2 items-center rounded-md cursor-pointer border-2 relative',
        selected ? 'border-black' : 'border-tertiary',
      )}
      onClick={async () => {
        await citySetAction(city);
      }}
    >
      <span className='text-sm'>{city}</span>
      {selected && (
        <CircleCheckIcon className='text-black size-5 absolute -right-2 -top-2 bg-white' />
      )}
    </div>
  );
};

export default SelectCity;
