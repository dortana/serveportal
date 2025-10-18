'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
// @ts-ignore: no type declarations for these side-effect CSS imports in this proj
import 'swiper/css';
//@ts-ignore: no type declarations for these side-effect CSS imports in this project
import 'swiper/css/effect-coverflow';

import ExpertCard from './ExpertCard';

const SwiperCards = () => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      autoplay={{
        delay: 1000, // ✅ 1 second
        disableOnInteraction: false, // ✅ keeps autoplay even after user swipe
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={false}
      modules={[EffectCoverflow, Autoplay]}
      loop
      className='w-full md:w-2/3'
    >
      <SwiperSlide>
        <ExpertCard />
      </SwiperSlide>
      <SwiperSlide>
        <ExpertCard />
      </SwiperSlide>
      <SwiperSlide>
        <ExpertCard />
      </SwiperSlide>
      <SwiperSlide>
        <ExpertCard />
      </SwiperSlide>
      <SwiperSlide>
        <ExpertCard />
      </SwiperSlide>
      <SwiperSlide>
        <ExpertCard />
      </SwiperSlide>
      <SwiperSlide>
        <ExpertCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperCards;
