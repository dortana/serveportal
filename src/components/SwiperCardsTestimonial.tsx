'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
//@ts-ignore
import 'swiper/css';
//@ts-ignore
import 'swiper/css/effect-cards';
//@ts-ignore
import 'swiper/css/navigation';

import { EffectCards, Navigation, Autoplay } from 'swiper/modules';
import TestimonialCard from './TestimonialCard';

export default function SwiperCardsTestimonial() {
  return (
    <div className='relative flex justify-center items-center w-fit mx-auto'>
      <button
        className='custom-prev absolute left-[-80px] top-1/2 max-sm:hidden -translate-y-1/2 cursor-pointer'
        aria-label='Previous'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='30'
          height='30'
          color='#000000'
          fill='none'
        >
          <path
            opacity='0.4'
            d='M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25Z'
            fill='currentColor'
          ></path>
          <path
            d='M11.5139 12C11.5202 12.0164 11.5288 12.0372 11.5402 12.0625C11.5923 12.1777 11.6785 12.3303 11.8024 12.5173C12.0497 12.8904 12.3935 13.3209 12.7568 13.7416C13.1166 14.1581 13.4788 14.5456 13.7523 14.8303L14.2007 15.2864C14.5946 15.6734 14.6005 16.3066 14.2136 16.7006C13.8266 17.0947 13.1935 17.1004 12.7994 16.7135L12.3103 16.2161C12.0214 15.9155 11.6335 15.5007 11.2433 15.0489C10.8567 14.6013 10.4504 14.0977 10.1353 13.622C9.97793 13.3846 9.82979 13.1341 9.7178 12.8864C9.61378 12.6564 9.50009 12.3416 9.50009 12C9.50009 11.6583 9.61378 11.3435 9.7178 11.1134C9.82979 10.8658 9.97793 10.6152 10.1353 10.3778C10.4504 9.90219 10.8567 9.39851 11.2433 8.95092C11.6335 8.4992 12.0214 8.08438 12.3103 7.78374L12.7994 7.28638C13.1935 6.89942 13.8266 6.90517 14.2136 7.29922C14.6005 7.69325 14.5946 8.32645 14.2007 8.71342L13.7523 9.16957C13.4788 9.45423 13.1166 9.84178 12.7568 10.2583C12.3935 10.679 12.0497 11.1095 11.8024 11.4827C11.6785 11.6697 11.5923 11.8222 11.5402 11.9374C11.5288 11.9627 11.5202 11.9834 11.5139 12Z'
            fill='currentColor'
          ></path>
        </svg>
      </button>

      <Swiper
        effect='cards'
        grabCursor
        modules={[EffectCards, Navigation, Autoplay]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        cardsEffect={{
          slideShadows: false,
        }}
        className='w-[250px] h-[320px]'
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <SwiperSlide key={i} className='!w-[250px] !h-[320px] py-4'>
            <TestimonialCard />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className='custom-next absolute right-[-80px] top-1/2  max-sm:hidden -translate-y-1/2 cursor-pointer'
        aria-label='Next'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='30'
          height='30'
          color='#000000'
          fill='none'
        >
          <path
            opacity='0.4'
            d='M12 22.75C6.06295 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06295 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z'
            fill='currentColor'
          ></path>
          <path
            d='M12.4861 12C12.4798 11.9834 12.4713 11.9627 12.4598 11.9374C12.4077 11.8222 12.3215 11.6696 12.1976 11.4826C11.9503 11.1094 11.6065 10.679 11.2432 10.2583C10.8834 9.8418 10.5212 9.45425 10.2477 9.16959L9.79934 8.71344C9.40537 8.32647 9.39952 7.69327 9.78645 7.29924C10.1734 6.90519 10.8065 6.89944 11.2006 7.2864L11.6897 7.78376C11.9786 8.0844 12.3665 8.49922 12.7567 8.95094C13.1433 9.39853 13.5496 9.90221 13.8648 10.3778C14.0221 10.6152 14.1702 10.8658 14.2822 11.1134C14.3862 11.3435 14.4999 11.6583 14.4999 12C14.4999 12.3416 14.3862 12.6564 14.2822 12.8865C14.1702 13.1341 14.0221 13.3846 13.8648 13.6221C13.5496 14.0977 13.1433 14.6014 12.7567 15.049C12.3665 15.5007 11.9786 15.9155 11.6897 16.2161L11.2006 16.7135C10.8065 17.1005 10.1734 17.0947 9.78645 16.7007C9.39952 16.3066 9.40537 15.6734 9.79934 15.2865L10.2477 14.8303C10.5212 14.5456 10.8834 14.1581 11.2432 13.7416C11.6065 13.3209 11.9503 12.8905 12.1976 12.5173C12.3215 12.3303 12.4077 12.1777 12.4598 12.0625C12.4713 12.0372 12.4798 12.0164 12.4861 12Z'
            fill='currentColor'
          ></path>
        </svg>
      </button>
    </div>
  );
}
