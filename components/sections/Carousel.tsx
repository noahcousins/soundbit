"use client";

import { useRef, useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { fetchPoliticianById } from "@/utils/supabase/api";
import { MoveLeft, MoveRight } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import PoliticianBlip from "@/components/politicians/PoliticianBlip";
import Image from "next/image";

export default function Carousel({ slides }: { slides: any }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [politicians, setPoliticians] = useState({});

  const swiperRef = useRef(null);

  const swiperSlideDur = 3000;

  useEffect(() => {
    const fetchPolitician = async (id: string) => {
      const data = await fetchPoliticianById(id);
      setPoliticians((prev) => ({ ...prev, [id]: data }));
    };

    // Fetch for each slide's politician_id
    slides.forEach((slide: any) => {
      //@ts-ignore
      if (slide?.politician_id && !politicians[slide.politician_id]) {
        fetchPolitician(slide.politician_id);
      }
    });
  }, [slides]);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        loop={true}
        fadeEffect={{
          crossFade: true, // enables slides to cross fade
        }}
        effect="fade"
        pagination={{
          renderCustom: (swiper, current, total) => {
            setTotalPage(total);
            setCurrentPage(current);
            return `${current} of ${total}`;
          },
          type: "custom",
        }}
        autoplay={{
          delay: swiperSlideDur,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-next-button",
          prevEl: ".swiper-prev-button",
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        ref={swiperRef}
        className="rounded-2xl"
      >
        {slides.map((slide: any, index: any) => (
          <SwiperSlide
            className="relative z-20 grid min-h-[480px] w-full shrink-0 grid-cols-2 flex-wrap items-center justify-items-center overflow-hidden md:min-h-[390px]"
            key={index}
          >
            <div className="relative flex h-full w-full items-center rounded-2xl bg-primary/5">
              <div className="absolute inset-0 -z-20">
                <Image
                  alt={`Image of ${slide.title}`}
                  fill
                  className="-z-10 h-full w-full object-cover"
                  src={slide.background_image}
                />
              </div>

              <div className="overlay absolute inset-0 z-[1] bg-gradient-to-r from-background to-transparent"></div>

              <div className="z-[2] flex h-full w-full flex-col justify-between p-12">
                <div className="flex flex-col gap-2">
                  <h3 className="text-4xl font-semibold line-clamp-2">
                    {slide?.title}
                  </h3>
                </div>
                {/* @ts-ignore */}
                {politicians[slide.politician_id] && (
                  <PoliticianBlip
                    //@ts-ignore
                    politician={politicians[slide.politician_id]}
                    isSmall={true}
                  />
                )}

                <h4 className="font-regular w-96 text-base text-primary">
                  {slide?.subheading}
                </h4>
                {/* <ul className="flex list-disc flex-col  gap-2">
                  {slide?.bullets?.slice(0, 3).map((point, index) => (
                    <li key={index} className="whitespace-nowrap text-sm">
                      {point}
                    </li>
                  ))}
                </ul> */}
                <Button className="w-36" asChild>
                  <Link className="whitespace-nowrap" href={slide.link}>
                    View politician
                  </Link>
                </Button>
                <div className="flex h-5 items-center gap-4">
                  <button
                    onClick={() => {
                      //@ts-ignore
                      if (swiperRef.current && swiperRef.current.swiper) {
                        //@ts-ignore
                        swiperRef.current.swiper.slidePrev();
                      }
                    }}
                    className="opacity-100 transition-opacity duration-100 ease-in-out hover:opacity-50"
                  >
                    <MoveLeft className="flex h-fit text-primary" size={20} />
                  </button>
                  <div className="my-auto text-center text-sm text-primary text-opacity-50">
                    {currentPage} of {totalPage}
                  </div>
                  <button
                    onClick={() => {
                      //@ts-ignore
                      if (swiperRef.current && swiperRef.current.swiper) {
                        //@ts-ignore
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
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-2 flex w-full flex-row items-center gap-4">
        <PageBullets
          current={currentPage}
          total={totalPage}
          swiperSlideDur={swiperSlideDur}
          onClick={(index: any) =>
            //@ts-ignore
            swiperRef.current!.swiper.slideToLoop(index, 500, true)
          }
        />
        <div className="flex gap-4">
          <button
            className="opacity-100 transition-opacity duration-100 ease-in-out hover:opacity-50"
            onClick={() => {
              //@ts-ignore
              if (swiperRef.current && swiperRef.current.swiper) {
                //@ts-ignore
                swiperRef.current.swiper.slidePrev();
              }
            }}
          >
            <MoveLeft className="flex h-fit text-primary" size={20} />
          </button>

          <button
            className="opacity-100 transition-opacity duration-100 ease-in-out hover:opacity-50"
            onClick={() => {
              //@ts-ignore
              if (swiperRef.current && swiperRef.current.swiper) {
                //@ts-ignore
                swiperRef.current.swiper.slideNext();
              }
            }}
          >
            <MoveRight
              className="flex h-fit text-primary text-opacity-100 transition-opacity duration-100 ease-in-out hover:text-opacity-25"
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function PageBullets({
  current,
  total,
  onClick,
  swiperSlideDur,
}: {
  current: number;
  total: number;
  onClick: Function;
  swiperSlideDur: number;
}) {
  return (
    <div className="relative z-10 flex w-full justify-between gap-2">
      {[...Array(total)].map((_, index) => {
        const isActive = index + 1 === current;
        const progressBarWidth = index < current ? 100 : 0; // Set width to 100% if the slide's index is less than the current index, otherwise 0

        return (
          <div
            className={`border-contrast ease-in-out] relative h-[4px] w-full cursor-pointer overflow-hidden rounded-full bg-foreground/25 transition-all duration-75 ${
              isActive ? "bg-foreground/10" : "opacity-50"
            }`}
            key={index}
            onClick={() => onClick(index)}
          >
            <div
              className="absolute left-0 h-full w-full bg-foreground"
              style={{
                width: `${isActive ? progressBarWidth : 0}%`,
                transition: isActive ? `width ${swiperSlideDur}ms linear` : "",
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
