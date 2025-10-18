import { cn } from '@/lib/utils';
import React from 'react';

const Heading = ({
  head,
  subHead,
  headClassName,
  subHeadClassName,
}: {
  head: string;
  subHead?: string;
  headClassName?: string;
  subHeadClassName?: string;
}) => {
  return (
    <div>
      <h2
        className={cn(
          'text-2xl md:text-4xl font-semibold mb-4 px-4 text-center',
          headClassName,
        )}
      >
        {head}
      </h2>
      <p
        className={cn(
          'text-zinc-500 max-w-2xl mx-auto text-center px-4',
          subHeadClassName,
        )}
      >
        {subHead}
      </p>
    </div>
  );
};

export default Heading;
