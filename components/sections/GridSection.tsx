'use client';

import Link from 'next/link';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';

import {
  Megaphone,
  Users2,
  ScrollText,
  Compass,
  Mic,
  Blocks,
  Gavel,
  Info
} from 'lucide-react';

const components = [
  {
    title: 'Outreach',
    href: '/outreach',
    description:
      'One click tool to message your elected officials about UAP. Find all points of contact for your rep.',
    icon: Megaphone
  },
  {
    title: 'Politicians',
    href: '/politicians',
    description:
      'Find all congressional politicians active on UAP. Browse by party, state, and position.',
    icon: Users2
  },
  {
    title: 'Statements',
    href: '/statements',
    description:
      'Hear directly from politicians on UAP. Investigate how the statements affect the Bipartisan Index.',
    icon: Mic
  },
  {
    title: 'Legislation',
    href: '/legislation',
    description:
      'Vote on all proposed and enacted UAP legislation, and track the status as debated in Congress.',
    icon: ScrollText
  },
  {
    title: 'Hearings',
    href: '/hearings',
    description:
      'Browse all congressional hearings related to UAP, including members, dates, and topics discussed.',
    icon: Gavel
  },
  {
    title: 'Newsroom',
    href: '/newsroom',
    description:
      'Read trending articles about UAP disclosure in Washington, from trusted & reliable sources.',
    icon: Compass
  }
];

const GridSection = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY
  }: MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-6xl">
          <span className="">Closest thing</span>
          <br />
          <span className="text-purple-600">to a SCIF</span>.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {components.map((item: any, index: number) => {
          return (
            <motion.div
              key={index}
              onMouseMove={handleMouseMove}
              className="group relative isolate flex flex-1 flex-col rounded-xl shadow"
            >
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      650px circle at ${mouseX}px ${mouseY}px,
                      rgba(147, 51, 234, .14),
                      transparent 80%
                    )
                  `
                }}
              />
              <div
                key={index}
                className={`background-gradient before:rounded-[13px]before:lg:block group relative isolate flex flex-1 flex-col rounded-xl shadow ring-1 ring-zinc-600/50 transition-all duration-100 ease-in-out before:absolute before:-inset-[2px] before:z-[-1] before:hidden before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] hover:ring-purple-600/100`}
              >
                <div className="flex flex-1 flex-col divide-y  overflow-hidden rounded-xl  transition-[background-opacity] ">
                  <div className="flex flex-1 flex-col gap-x-8 gap-y-4 rounded-xl px-4 py-5 dark:bg-zinc-900/50 sm:p-6">
                    <Link href={item.href}>
                      <div className="absolute inset-0"></div>
                    </Link>
                    <div className="flex items-center gap-2">
                      <item.icon
                        className="h-4 w-4 text-purple-600"
                        aria-hidden="true"
                      />

                      <p className="truncate text-base font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-1 text-[15px] text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default GridSection;
