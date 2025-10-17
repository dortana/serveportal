import React from 'react';
import { Unbounded } from 'next/font/google';
import { cn } from '@/lib/utils';

const orbitron = Unbounded({
  weight: '500',
});

const BrandText = ({ className }: { className?: string }) => {
  return (
    <h2 className={cn('tracking-wider text-xl', orbitron.className, className)}>
      ServePortal
    </h2>
  );
};

export default BrandText;
