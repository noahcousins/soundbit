'use client';

import { motion } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';

import { FaPlay, FaPause } from 'react-icons/fa';
import { useWaveSurfer } from '@/context/WaveSurferContext';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { Disc3 } from 'lucide-react';

import { useState } from 'react';
import WavePlayer from '../waveplayer/WavesurferPlayer';
import { dynamicBlurDataUrl } from '../util/dynamicBlurDataUrl';

export default function TopTrackCard({
  track,
  index,
  backgroundColor
}: {
  track: any;
  index: number;
  backgroundColor: any;
}) {
  const [paused, setPaused] = useState(true);

  const { activePlayer, setPlayer } = useWaveSurfer();

  const playPreview = () => {
    if (activePlayer === track.preview_url) {
      setPlayer(null);
    } else {
      setPlayer(track.preview_url);
    }
  };

  const isPlaying = activePlayer === track.preview_url;

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
    <div
      className={`group flex w-full flex-col gap-2 ${
        backgroundColor === 'bg-[#DDDDDD]'
          ? 'bg-white text-black'
          : 'bg-black/25 text-white'
      } rounded-lg bg-black/25 p-2 text-left`}
    >
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
          className={`absolute inset-1/2 z-10 h-1/4 w-1/4 translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-100 ease-in-out hover:scale-105 hover:bg-gray-300 ${
            activePlayer === track.preview_url
              ? 'flex'
              : 'flex lg:hidden lg:group-hover:flex'
          }`}
        >
          {activePlayer === track.preview_url ? (
            <FaPause
              size={16}
              className="ml-1 h-1/2 w-1/2 text-black lg:h-[45%] lg:w-[45%]"
            />
          ) : (
            <FaPlay
              size={16}
              className="ml-1 h-1/2 w-1/2 text-black lg:h-[45%] lg:w-[45%]"
            />
          )}
        </button>
        <motion.div
          className="absolute bottom-0 z-0 w-full -translate-x-1/2 bg-black/80 p-1 backdrop-blur-lg"
          initial="hidden"
          animate={activePlayer === track.preview_url ? 'visible' : 'hidden'}
          variants={wavePlayerVariants}
        >
          <WavePlayer
            waveColor={backgroundColor}
            paused={!isPlaying}
            url={track.preview_url}
          />
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
          <p
            className={`line-clamp-1 flex w-fit gap-1 rounded-sm  ${
              backgroundColor === 'bg-[#DDDDDD]'
                ? 'bg-black/20 text-black'
                : 'bg-white/20 text-white'
            } px-2 py-1 text-xs transition-transform duration-100 ease-in-out hover:bg-white/40 active:scale-105 active:bg-white/50`}
          >
            <Disc3 size={16} />
            <span className="line-clamp-1">{track.album.name}</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
