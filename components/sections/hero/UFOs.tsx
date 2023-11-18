import React from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Custom random function that biases towards higher values
function biasedRandom(min: number, max: number, bias = 0.7) {
  const r = Math.random();
  const mix = r * bias + (1 - bias);
  return min + mix * (max - min);
}

const UFO = ({ position }: { position: any }) => {
  const initialY = position[1];
  const randomOffset = (Math.random() - 0.5) * biasedRandom(1, 134, 0.7); // Adjust bias value

  return (
    <motion.div
      initial={{ y: initialY }}
      animate={{ y: initialY + randomOffset }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }}
      style={{
        position: 'absolute',
        left: position[0],
        top: position[1],
        width: '100px', // Adjust the size accordingly
        height: '100px' // Adjust the size accordingly
      }}
    >
      <Image src="/ufo.svg" alt="UFO" width={100} height={100} />
    </motion.div>
  );
};

export default function UFOs() {
  const ufoPositions = [
    [80, 100],
    [405, 10],
    [398, 214],
    [850, 548],
    [1279, 100],
    [1100, 158],
    [1300, 234]
  ];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {ufoPositions.map((position, index) => (
        <UFO key={index} position={position} />
      ))}
    </div>
  );
}
