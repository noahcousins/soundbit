'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { Sparkles } from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { useState } from 'react';

export default function Hero({ profileData }: { profileData: any }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div
      style={{ backgroundImage: "url('/endless-constellation.svg')" }}
      className="relative grid w-full place-items-center overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-10 z-10 flex transform-gpu justify-center overflow-hidden opacity-5 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#FF2E01] to-[#FF2E01]"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
          }}
        />
      </div>
      <motion.div className="relative z-[11] mx-auto flex w-full flex-col gap-4 text-primary dark:drop-shadow-2xl sm:px-16 md:max-w-7xl md:gap-8 lg:px-8">
        <div className="relative flex w-full flex-col gap-6 px-8 py-28 text-center lg:px-0">
          <Badge
            className="mx-auto flex w-fit items-center gap-1 border-[1px] border-[#FF2E01] bg-[#FF2E01]/10 text-base font-normal text-[#FF2E01]"
            variant="secondary"
          >
            <Sparkles size={16} className="text-[#FF2E01]" />
            Beta Release
          </Badge>
          <h1 className="relative z-20 text-center font-grtsk-giga text-xl font-black uppercase text-white drop-shadow-xl sm:text-3xl md:text-4xl lg:text-5xl">
            Promote your <br /> music in minutes
          </h1>
          <Button
            className="z-40 mx-auto w-fit scale-100 rounded-full bg-[#FF2E01] p-6 text-base font-normal text-white transition-transform duration-100 ease-in-out hover:scale-105 hover:bg-[#e00000] active:scale-100 active:bg-[#FF2E01]"
            asChild
            onClick={handleClick}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : profileData && profileData.handle ? (
              <Link href={`/${profileData.handle}`}>My Site</Link>
            ) : (
              <Link href="/welcome">Start Now</Link>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 z-30 h-2/6 w-full bg-gradient-to-t from-[#181818] to-transparent"></div>
    </div>
  );
}
