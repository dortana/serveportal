'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
// @ts-ignore: no type declarations for these side-effect CSS imports in this proj
import 'swiper/css';
//@ts-ignore: no type declarations for these side-effect CSS imports in this project
import 'swiper/css/effect-coverflow';

import ExpertCard from './ExpertCard';
import { Expert } from '@/types/app';

const SwiperCards = () => {
  const experts: Expert[] = [
    {
      id: 1,
      firstName: 'Alex',
      lastName: 'Johnson',
      imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
      service: 'Cooking',
      location: 'Budapest',
      pricePerHour: 6000,
      rating: 4.8,
      reviewsCount: 124,
    },
    {
      id: 2,
      firstName: 'Sofia',
      lastName: 'Kovács',
      imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      service: 'Cooking',
      location: 'Érd',
      pricePerHour: 8500,
      rating: 4.9,
      reviewsCount: 97,
    },
    {
      id: 3,
      firstName: 'David',
      lastName: 'Nagy',
      imageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
      service: 'Cooking',
      location: 'Budaörs',
      pricePerHour: 7000,
      rating: 4.6,
      reviewsCount: 68,
    },
    {
      id: 4,
      firstName: 'Lili',
      lastName: 'Tóth',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      service: 'Cooking',
      location: 'Debrecen',
      pricePerHour: 7500,
      rating: 4.7,
      reviewsCount: 82,
    },
    {
      id: 5,
      firstName: 'Benjamin',
      lastName: 'Varga',
      imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
      service: 'Cooking',
      location: 'Pécs',
      pricePerHour: 9000,
      rating: 4.9,
      reviewsCount: 110,
    },
    {
      id: 6,
      firstName: 'Réka',
      lastName: 'Kiss',
      imageUrl: 'https://randomuser.me/api/portraits/women/66.jpg',
      service: 'Cooking',
      location: 'Szeged',
      pricePerHour: 5500,
      rating: 4.4,
      reviewsCount: 43,
    },
    {
      id: 7,
      firstName: 'Gábor',
      lastName: 'Farkas',
      imageUrl: 'https://randomuser.me/api/portraits/men/77.jpg',
      service: 'Cooking',
      location: 'Győr',
      pricePerHour: 12000,
      rating: 4.8,
      reviewsCount: 132,
    },
    {
      id: 8,
      firstName: 'Anna',
      lastName: 'Molnár',
      imageUrl: 'https://randomuser.me/api/portraits/women/88.jpg',
      service: 'Cooking',
      location: 'Székesfehérvár',
      pricePerHour: 5000,
      rating: 4.5,
      reviewsCount: 56,
    },
    {
      id: 9,
      firstName: 'Levente',
      lastName: 'Horváth',
      imageUrl: 'https://randomuser.me/api/portraits/men/99.jpg',
      service: 'Cooking',
      location: 'Tatabánya',
      pricePerHour: 8000,
      rating: 4.6,
      reviewsCount: 71,
    },
    {
      id: 10,
      firstName: 'Petra',
      lastName: 'Szabó',
      imageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
      service: 'Cooking',
      location: 'Kecskemét',
      pricePerHour: 6500,
      rating: 4.7,
      reviewsCount: 88,
    },
    {
      id: 11,
      firstName: 'Máté',
      lastName: 'Balogh',
      imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
      service: 'Tutoring',
      location: 'Sopron',
      pricePerHour: 9500,
      rating: 4.9,
      reviewsCount: 140,
    },
    {
      id: 12,
      firstName: 'Eszter',
      lastName: 'Oláh',
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      service: 'Child Care',
      location: 'Veszprém',
      pricePerHour: 7200,
      rating: 4.8,
      reviewsCount: 103,
    },
    {
      id: 13,
      firstName: 'Attila',
      lastName: 'Lakatos',
      imageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
      service: 'Photography',
      location: 'Miskolc',
      pricePerHour: 10000,
      rating: 4.9,
      reviewsCount: 117,
    },
    {
      id: 14,
      firstName: 'Nóra',
      lastName: 'Papp',
      imageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
      service: 'Hairdresser',
      location: 'Budapest',
      pricePerHour: 9000,
      rating: 4.7,
      reviewsCount: 95,
    },
    {
      id: 15,
      firstName: 'Zoltán',
      lastName: 'Török',
      imageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
      service: 'Cooking',
      location: 'Szolnok',
      pricePerHour: 11000,
      rating: 4.8,
      reviewsCount: 126,
    },
  ];

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
      {experts.map((expert, index) => {
        return (
          <SwiperSlide key={index}>
            <ExpertCard expert={expert} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperCards;
