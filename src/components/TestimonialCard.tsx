import Image from 'next/image';
import React from 'react';
import RatingStar from './RatingStar';

const TestimonialCard = () => {
  return (
    <div className='w-full h-full shadow-md bg-white rounded-lg border flex flex-col justify-center items-center p-2 px-4'>
      <Image
        src='https://github.com/maxleiter.png'
        width={70}
        height={70}
        alt='User Image'
        className='rounded-full'
      />
      <h2 className='text-md mt-1'>John Doe</h2>
      <span className='text-zinc-500 text-sm'>2025.05.12</span>

      <RatingStar rate={5} className='my-3' />
      <p className='text-zinc-500 text-sm text-center'>
        I love your services and it was pretty fast and peroffessional and it
        was pretty fast and peroffessional
      </p>
    </div>
  );
};

export default TestimonialCard;
