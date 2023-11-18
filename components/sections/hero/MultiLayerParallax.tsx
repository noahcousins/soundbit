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
        className="relative z-[11] mx-auto flex w-4/6 flex-col gap-4 pb-28 text-primary dark:drop-shadow-2xl sm:px-16 md:max-w-7xl md:gap-8 md:pb-60 lg:px-8 lg:pb-80"
      >
        <h1
          //@ts-ignore
          style={{ y: textY }}
          className="xs:text-5xl relative z-20 max-w-lg text-5xl font-semibold dark:drop-shadow-[0px_0px_3px_rgba(0,0,0,1)] sm:text-left md:max-w-xl md:text-6xl lg:text-7xl"
        >
          <span className="sm:whitespace-nowrap">Connecting the </span>{' '}
          <span className="sm:whitespace-nowrap">aisle on UAP.</span>
        </h1>
        <p className="flex max-w-lg flex-col gap-4 rounded-2xl text-left text-base leading-8 text-primary dark:drop-shadow-[0px_0px_3px_rgba(0,0,0,1)] sm:max-w-xl md:w-4/5 md:text-lg">
          <span className="">
            Scope out the political scene around the UAP issue with{' '}
            <span className="font-bold">UAPoli</span>.
          </span>
          <span className="">
            An intuitive platform to keep you up to date on politicians, their
            statements, and legislation relating to UAP.
          </span>
        </p>
        <Link href="/explore">
          <button className="rounded-xl bg-gradient-to-r from-[#a972ff] via-[#895dff] to-indigo-500 p-1 shadow-none transition-all duration-300 ease-in-out hover:shadow-[0_0_28px_0px_rgba(178,46,255,0.9)]">
            <span className="block rounded-lg bg-[#18181B] px-4 py-2 font-semibold text-white transition-colors duration-100 ease-in-out hover:bg-black">
              Explore
            </span>
          </button>
        </Link>
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
      <div className="pointer-events-none absolute bottom-0 z-[33] h-2/6 w-full bg-gradient-to-t from-background to-transparent"></div>
      <div className="pointer-events-none absolute left-0 z-[33] h-full w-1/6 bg-gradient-to-r from-background to-transparent"></div>
      <div className="pointer-events-none absolute right-0 z-[33] h-full w-1/6 bg-gradient-to-l from-background to-transparent"></div>
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
