'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
// @ts-ignore: no type declarations for these side-effect CSS imports in this proj
import 'swiper/css';
//@ts-ignore: no type declarations for these side-effect CSS imports in this project
import 'swiper/css/effect-coverflow';

import ExpertCard from './ExpertCard';

const SwiperCards = () => {
  return (
    <Swiper
      style={{ width: '100%' }}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={true}
      modules={[EffectCoverflow]}
      loop
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
