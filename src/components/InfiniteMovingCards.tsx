'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import CityIcon from './icons/CityIcon';

export const InfiniteMovingCards = ({
  items,
  direction = 'right',
  speed = 'slow',
  pauseOnHover = true,
  className,
}: {
  items: string[];
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards',
        );
      } else if (direction === 'right') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse',
        );
      } else if (direction === 'up') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse',
        );
        containerRef.current.style.setProperty(
          '--animation-name',
          'scroll-vertical-animate',
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards',
        );
        containerRef.current.style.setProperty(
          '--animation-name',
          'scroll-vertical-animate',
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn('scroller relative z-20 w-dvw', className)}
    >
      <ul
        ref={scrollerRef}
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
        className={cn(
          'flex flex-row min-w-full shrink-0 gap-4 py-4 w-max',
          start && 'animate-scroll',
        )}
        style={{
          animationPlayState: paused ? 'paused' : 'running',
          transform:
            direction === 'right' ? 'translateX(-50%)' : 'translateX(0)',
        }}
      >
        {items.map((item, idx) => (
          <li
            className='min-w-[150px] relative rounded-2xl flex-shrink-0 p-2 md:p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ml-5 border bg-white'
            key={item + idx}
          >
            <div className='flex items-center justify-center gap-2 h-full'>
              <CityIcon />
              <span className='text-lg font-normal text-black'>{item}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
