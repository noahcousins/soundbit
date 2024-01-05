'use client';

import { motion } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';

import { FaPlay, FaPause } from 'react-icons/fa';
import { useWaveSurfer } from '@/src/context/WaveSurferContext';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/src/components/ui/tooltip';

import { Disc3 } from 'lucide-react'; // Update the path accordingly

import { useState } from 'react';
import WavePlayer from '../waveplayer/WavesurferPlayer';

export default function TopTrackCard({
  track,
  index
}: {
  track: any;
  index: number;
}) {
  const [paused, setPaused] = useState(true);
  const { activePlayer, setPlayer } = useWaveSurfer();

  const playPreview = () => {
    if (paused) {
      setPaused(false);
      setPlayer(track.preview_url);
    } else {
      setPaused(true);
      setPlayer(null);
    }
  };

  const wavePlayerVariants = {
    hidden: {
      y: '100%',
      opacity: 1
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        type: 'tween',
        stiffness: 150,
        damping: 20
      }
    }
  };

  return (
    <div className="group flex w-full flex-col gap-4 text-left">
      <div className="relative flex overflow-hidden">
        <Image
          alt={track.name}
          height={200}
          className="image-no-drag w-full overflow-hidden rounded-sm transition-transform duration-100 ease-in-out group-hover:scale-105"
          width={200}
          src={track.album.images[0].url}
        />
        <button
          onClick={playPreview}
          className={`absolute inset-1/2 z-10 h-1/3 w-1/3 translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-100 ease-in-out hover:scale-105 hover:bg-gray-300 ${
            activePlayer === track.preview_url
              ? 'flex'
              : 'hidden group-hover:flex'
          }`}
        >
          {activePlayer === track.preview_url ? (
            <FaPause
              size={16}
              className="ml-1 h-[12px] w-[12px] text-background sm:h-[45%] sm:w-[45%]"
            />
          ) : (
            <FaPlay
              size={16}
              className="ml-1 h-[12px] w-[12px] text-background sm:h-[45%] sm:w-[45%]"
            />
          )}
        </button>
        <motion.div
          className="absolute bottom-0 z-0 w-full -translate-x-1/2 bg-black/80 p-1 backdrop-blur-lg"
          initial="hidden"
          animate={activePlayer === track.preview_url ? 'visible' : 'hidden'}
          variants={wavePlayerVariants}
        >
          <WavePlayer paused={paused} url={track.preview_url} />
        </motion.div>
      </div>
      <div className="flex flex-col gap-1">
        <Link target="_blank" href={track.external_urls.spotify}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="line-clamp-1 text-left text-base">{track.name}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{track.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        <Link target="_blank" href={track.album.external_urls.spotify}>
          <p className="line-clamp-1 flex w-fit gap-1 rounded-sm bg-white/20 px-2 py-1 text-xs transition-transform duration-100 ease-in-out hover:bg-white/40 active:scale-105 active:bg-white/50">
            <Disc3 size={16} />
            <span className="line-clamp-1">{track.album.name}</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
