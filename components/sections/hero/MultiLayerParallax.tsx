'use client';

import {
  motion,
  useScroll,
  useMotionValue,
  useTransform,
  MotionValue
} from 'framer-motion';
import Link from 'next/link';
import React, { useRef } from 'react';
import Stars from '@/components/sections/hero/Stars';
import UFOs from '@/components/sections/hero/UFOs';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function MultiLayerParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use a consistent type for your MotionValues. Here, we're using strings.
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '120%']
  ) as MotionValue<string>;
  const ufosY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '110%']
  ) as MotionValue<string>;
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '100%']
  ) as MotionValue<string>;

  // ...;
  const blurY = useTransform(scrollYProgress, [0, 1], ['0%', '125%']);

  const ufosRotateX = useTransform(mouseY, [-200, 200], [5, -5], {
    clamp: false
  });
  const ufosRotateY = useTransform(mouseX, [-200, 200], [-5, 5], {
    clamp: false
  });

  return (
    <div
      ref={ref}
      onMouseMove={(event) => {
        mouseX.set(event.clientX - window.innerWidth / 2);
        mouseY.set(event.clientY - window.innerHeight / 2);
      }}
      className="relative grid h-screen w-full place-items-center overflow-hidden"
    >
      <motion.div
        style={{ y: textY }}
        className="relative z-[11] mx-auto flex w-full flex-col gap-4 pb-28 text-primary dark:drop-shadow-2xl sm:px-16 md:max-w-7xl md:gap-8 md:pb-60 lg:px-8 lg:pb-80"
      >
        <div className="flex w-full flex-col gap-8 px-8 py-16 text-center lg:px-0">
          <Badge className="mx-auto w-fit" variant="secondary">
            Rated most intuitive UAP congressional outreach tool
          </Badge>
          <h1 className="xs:text-5xl relative z-20 text-center text-5xl font-bold dark:drop-shadow-[0px_0px_3px_rgba(0,0,0,1)] md:text-6xl lg:text-8xl">
            <span className="sm:whitespace-nowrap">Connecting the </span>{' '}
            <span className="sm:whitespace-nowrap">
              aisle on <span className="text-purple-600">UAP</span>.
            </span>
          </h1>
          <p className="mx-auto flex max-w-xl flex-col gap-8 rounded-2xl text-center text-base leading-8 text-primary dark:drop-shadow-[0px_0px_3px_rgba(0,0,0,1)] md:w-4/5 md:text-lg">
            <span className="">
              Propelling bipartisan UAP disclosure efforts, by keep you up to
              date on politicians, their statements, and legislation relating to
              UAP.
            </span>
          </p>
          <Link href="/explore">
            <button className="rounded-xl bg-gradient-to-r from-[#a972ff] via-[#895dff] to-indigo-500 p-1 shadow-none transition-all duration-300 ease-in-out hover:shadow-[0_0_28px_0px_rgba(178,46,255,0.9)]">
              <span className="block rounded-lg bg-[#18181B] px-4 py-2 font-semibold text-white transition-colors duration-100 ease-in-out hover:bg-black">
                Explore
              </span>
            </button>
          </Link>
          <p className="text-center underline-offset-2 hover:underline">
            500+ letters sent to politicians about UAP
          </p>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: backgroundY,
          rotateX: ufosRotateX,
          rotateY: ufosRotateY
        }}
      >
        <Stars />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -left-28 z-0 sm:-left-24 md:inset-0"
        style={{
          y: ufosY,
          rotateX: ufosRotateX,
          rotateY: ufosRotateY,
          rotateZ: 0 // You can adjust the rotation around the Z-axis here
          // transition: "transform 0.2s ease-in-out", // Adding a transition for smoother movement
          // transformOrigin: "center center", // Set the rotation origin to the center
        }}
      >
        <UFOs />
      </motion.div>
      <div className="absolute z-10 h-full w-full opacity-70 sm:hidden ">
        <Image
          layout="fill"
          alt="Background blur"
          src={'/glow-homepage-mobile.webp'}
        />
      </div>
      <motion.div
        style={{ y: blurY }}
        className="z-10 hidden h-full w-full opacity-70 sm:absolute lg:hidden "
      >
        <Image
          layout="fill"
          alt="Background blur"
          src={'/glow-homepage-tablet.webp'}
        />
      </motion.div>
      <div className="z-10 h-full w-full overflow-visible opacity-60 lg:absolute">
        <Image fill alt="Background blur" src={'/glow-homepage.webp'} />
      </div>
      <div className="pointer-events-none absolute bottom-0 z-[33] h-2/6 w-full bg-gradient-to-t from-black to-transparent"></div>
      <div className="pointer-events-none absolute left-0 z-[33] h-full w-1/6 bg-gradient-to-r from-black to-transparent"></div>
      <div className="pointer-events-none absolute right-0 z-[33] h-full w-1/6 bg-gradient-to-l from-black to-transparent"></div>
      <div
        className="pointer-events-none absolute inset-0 -bottom-16 -right-20 z-[32] drop-shadow-[0px_0px_3px_rgba(0,0,0,1)]"
        style={{
          backgroundImage: `url(/skyline.svg)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover'
          //   backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
