'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { languageSetAction } from '@/actions/app';
import { CircleFlag } from 'react-circle-flags';

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

interface SelectLangProps {
  lang: string;
  code: string;
  selected: boolean;
}
const SelectLang = (props: SelectLangProps) => {
  const { lang, code, selected } = props;
  return (
    <div
      className={cn(
        'flex-1 h-5 hover:bg-tertiary p-4 flex gap-2 items-center rounded-md cursor-pointer border-2 relative',
        selected ? 'border-black' : 'border-tertiary',
      )}
      onClick={async () => {
        await languageSetAction(code);
      }}
    >
      <CircleFlag
        countryCode={code.split('-')[1].toLowerCase()}
        height={20}
        width={20}
      />

      <span className='text-sm'>{lang}</span>
      {selected && (
        <svg
          className='text-black size-5 absolute -right-2 -top-2 bg-white'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          color='#000000'
          fill='none'
        >
          <path
            d='M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z'
            stroke='currentColor'
            strokeWidth='1.5'
          ></path>
          <path
            d='M8 12L11 15L16 9'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </svg>
      )}
    </div>
  );
};

export default SelectLang;
