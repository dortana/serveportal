import React from 'react';
import HalfStarIcon from './icons/HalfStarIcon';
import StartIcon from './icons/StartIcon';
import EmptyStar from './icons/EmptyStar';
import { cn } from '@/lib/utils';

interface RatingStarProps {
  rate: number; // between 0 and 5, can be 2.5, 3.5, etc.
  className?: string;
}

const RatingStar = ({ rate, className }: RatingStarProps) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rate >= i) {
      // full star
      stars.push(<StartIcon key={i} />);
    } else if (rate >= i - 0.5) {
      // half star
      stars.push(<HalfStarIcon key={i} />);
    } else {
      // empty star (optional)
      stars.push(<EmptyStar key={i} />);
    }
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>{stars}</div>
  );
};

export default RatingStar;
