'use client';

import CountUp from 'react-countup';

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  separator?: string;
  className?: string;
}

export default function AnimatedNumber({
  end,
  duration = 3,
  separator = ',',
  className = '',
}: AnimatedNumberProps) {
  return (
    <span className={className}>
      <CountUp end={end} duration={duration} separator={separator} />
    </span>
  );
}
