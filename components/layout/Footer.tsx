'use client';

import { useState } from 'react';
import { CreditCardIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';

import UAPoliLogo from '../../public/uapoli-light.svg';

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  const iconVariants = {
    hovered: {
      scale: 1.1,
      transition: {
        duration: 0.1,
        yoyo: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <footer className="flex w-full flex-col justify-center gap-2 border-t border-t-foreground/10 p-8 text-center text-xs">
      <div className="flex w-full flex-col justify-between gap-8 sm:flex-row sm:gap-0">
        <div className="order-2 flex w-full flex-col gap-4 text-left sm:order-1">
          <Link className="mx-auto flex sm:mx-0" href="/">
            <Image
              priority
              alt="UAPoli logo"
              width={80}
              height={20.96}
              src={UAPoliLogo}
            />
          </Link>
          <p className="sm:text-light mx-auto w-36 text-center text-primary/90 sm:mx-0 sm:text-left">
            Propelling bipartisan UAP disclosure efforts in DC.
          </p>
          <p className="mx-auto flex items-center gap-1 sm:mx-0">
            Powered by{' '}
            <a
              href="https://twitter.com/CreditCardOnly"
              target="_blank"
              className="flex items-center gap-1 font-bold hover:underline"
              rel="noreferrer"
            >
              CreditCardOnly
              <motion.span
                className="text-center"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                variants={iconVariants}
                animate={isHovered ? 'hovered' : 'initial'}
              >
                <CreditCardIcon size={16} />
              </motion.span>
            </a>
          </p>
        </div>
        <div className="order-1 flex h-full w-full flex-col justify-between gap-8 sm:order-2 sm:flex-row">
          <ul className="flex h-full flex-col justify-between text-center text-xl sm:text-left sm:text-sm">
            <li className="">Outreach</li>
            <li className="">Explore</li>
            <li className="">How to Use</li>
            <li className="">Learn</li>
          </ul>
          <ul className="flex h-full flex-col justify-between text-center text-xl sm:text-left sm:text-sm">
            <li className="">Politicians</li>
            <li className="">Statements</li>
            <li className="">Legislation</li>
            <li className="">Hearings</li>
          </ul>
          <ul className="flex h-full flex-col justify-between text-center text-xl sm:text-left sm:text-sm">
            <li className="">Newsroom</li>
            <li className="">Account</li>
            <li className="">About Us</li>
            <li className="">Plans</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
