'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { languageSetAction } from '@/actions/app';
import { CircleFlag } from 'react-circle-flags';
import CircleCheckIcon from '../icons/CircleCheckIcon';

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
        <CircleCheckIcon className='text-black size-5 absolute -right-2 -top-2 bg-white' />
      )}
    </div>
  );
};

export default SelectLang;
