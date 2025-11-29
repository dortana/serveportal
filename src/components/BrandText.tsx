import React from 'react';
import { Unbounded } from 'next/font/google';
import { cn } from '@/lib/utils';
import { app_name } from '@/lib/data';

const orbitron = Unbounded({
  weight: '300',
});

const BrandText = ({ className }: { className?: string }) => {
  return (
    <h2 className={cn('tracking-wider text-xl', orbitron.className, className)}>
      {app_name}
    </h2>
  );
};

export default BrandText;
