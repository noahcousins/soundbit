// @ts-nocheck
// No check due to Swiper.js API types. Fix later.

'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import PoliticianBlip from '@/components/politicians/PoliticianBlip';

export default function FeaturedLegislationSlider({
  legislationsWithUpdatedPoliticians
}: {
  legislationsWithUpdatedPoliticians: any;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const swiperRef = useRef(null);

  const swiperSlideDur = 3000;

  return (
    <div className="flex h-fit w-full">
      <Swiper
        spaceBetween={0}
        loop={true}
        pagination={{
          renderCustom: (swiper, current, total) => {
            setTotalPage(total);
            setCurrentPage(current);
            return `${current} of ${total}`;
          },
          type: 'custom'
        }}
        autoplay={{
          delay: swiperSlideDur,
          disableOnInteraction: false
        }}
        navigation={{
          nextEl: '.swiper-next-button',
          prevEl: '.swiper-prev-button'
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        ref={swiperRef}
        className="rounded-2xl"
      >
        {legislationsWithUpdatedPoliticians
          .slice(0, 3)
          .map((legislation: any, index: any) => (
            <SwiperSlide
              className="relative z-20 grid min-h-[480px] w-full shrink-0 grid-cols-2 flex-wrap items-center justify-items-center overflow-hidden md:min-h-[390px]"
              key={index}
            >
              <div className="relative flex h-full w-full items-center rounded-2xl bg-primary/5">
                <div className="overlay absolute inset-0 z-[1] bg-gradient-to-r from-background to-transparent"></div>

                <div className="z-[2] flex h-full w-full flex-col gap-8 p-6 lg:p-12">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-regular text-primary">
                      {legislation?.bill}
                    </h4>
                    <h3 className="text-2xl font-semibold line-clamp-2">
                      {legislation?.title}
                    </h3>
                  </div>

                  {legislation.politicians.length > 0 && (
                    <div className="flex items-center gap-2">
                      <PoliticianBlip
                        politician={legislation.politicians[0]}
                        isSmall={true}
                      />
                      {legislation.politicians.length > 1 && (
                        <span className="whitespace-nowrap text-xs font-normal">
                          + {legislation.politicians.length - 1} others
                        </span>
                      )}
                    </div>
                  )}
                  <ul className="flex list-disc flex-col  gap-2">
                    {legislation?.bulletPoints
                      ?.slice(0, 3)
                      .map((point: any, index: any) => (
                        <li key={index} className="whitespace-nowrap text-sm">
                          {point}
                        </li>
                      ))}
                  </ul>
                  <Button className="w-36" asChild>
                    <Link className="whitespace-nowrap" href="/">
                      View politician
                    </Link>
                  </Button>
                  <div className="mt-2 flex w-full flex-row items-center gap-4">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => {
                          if (swiperRef.current && swiperRef.current.swiper) {
                            swiperRef.current.swiper.slidePrev();
                          }
                        }}
                        className="opacity-100 transition-opacity duration-100 ease-in-out hover:opacity-50"
                      >
                        <MoveLeft
                          className="flex h-fit text-primary"
                          size={20}
                        />
                      </button>
                      <div className="text-sm text-primary text-opacity-50">
                        {currentPage + 1} of {totalPage}
                      </div>
                      <button
                        onClick={() => {
                          if (swiperRef.current && swiperRef.current.swiper) {
                            swiperRef.current.swiper.slideNext();
                          }
                        }}
                        className="opacity-100 transition-opacity duration-100 ease-in-out hover:opacity-50"
                      >
                        <MoveRight
                          className="flex h-fit text-primary text-opacity-100 transition-opacity duration-100 ease-in-out hover:text-opacity-25"
                          size={20}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
