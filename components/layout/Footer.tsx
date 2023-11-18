'use client';

import { useState } from 'react';
import { CreditCardIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <motion.div
        className="mx-auto text-center"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        variants={iconVariants}
        animate={isHovered ? 'hovered' : 'initial'}
      >
        <CreditCardIcon />
      </motion.div>
      <p>
        Powered by{' '}
        <a
          href="https://www.reddit.com/user/CreditCardOnly"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          CreditCardOnly
        </a>
      </p>
    </footer>
  );
}
