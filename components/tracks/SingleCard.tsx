'use client';

import Link from 'next/link';
import Image from 'next/image';

import { FaPlay, FaPause } from 'react-icons/fa';
import { usePlayer } from '@/context/PlayerContext';
import { usePlayback } from '@/context/PlaybackContext';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { Disc3 } from 'lucide-react'; // Update the path accordingly

import { useEffect, useState } from 'react';

export default function SingleCard({ single }) {
  const { setTrack, setIsOpen } = usePlayer();
  const { playingTrack, setPlayingTrack } = usePlayback();

  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const newAudio = new Audio(single.preview_url);
    setAudio(newAudio);

    return () => {
      if (newAudio) {
        newAudio.pause();
      }
    };
  }, [single.preview_url]);

  const togglePlayPause = () => {
    // Check if audio is initialized
    if (!audio) {
      console.error('Audio not initialized');
      return;
    }

    if (playing) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      audio.play();
      setIsOpen(true);
      setTrack({
        name: single.name,
        preview_url: single.preview_url,
        artist: single.artists[0].name,
        image: single.images[0].url,
        productLink: 'linkypoo'
      });
      setPlayingTrack(single.id);
    }
    setPlaying(!playing);
  };

  const year = new Date(single.release_date).getFullYear();

  return (
    <div className="group flex w-full flex-col gap-4 text-left">
      {/* <Link
        className="relative flex"
        target="_blank"
        href={track.external_urls.spotify}
      > */}
      <div className="relative flex">
        <Image
          alt={single.name}
          height={200}
          className="image-no-drag w-full rounded-sm transition-transform duration-100 ease-in-out group-hover:scale-105"
          width={200}
          src={single.images[0].url}
        />

        <button
          onClick={togglePlayPause}
          className={`absolute inset-1/2 h-1/3 w-1/3 translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-100 ease-in-out hover:scale-105 hover:bg-gray-300 ${
            playing ? 'flex' : 'hidden group-hover:flex'
          }`}
        >
          {playing ? (
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
      </div>
      {/* </Link> */}

      <div className="flex flex-col gap-1">
        <Link target="_blank" href={single.external_urls.spotify}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="line-clamp-1 text-left text-base">
                  {single.name}
                </p>
              </TooltipTrigger>
              <TooltipContent>{single.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        <Link target="_blank" href={single.external_urls.spotify}>
          <p className="line-clamp-1 w-fit rounded-sm bg-white/20 px-2 py-1 text-xs transition-transform duration-100 ease-in-out hover:bg-white/40 active:scale-105 active:bg-white/50">
            Released in {year}
          </p>
        </Link>
      </div>
    </div>
  );
}
