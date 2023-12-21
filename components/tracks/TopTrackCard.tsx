'use client';

import Link from 'next/link';
import Image from 'next/image';

import { FaPlay, FaPause } from 'react-icons/fa';
import { usePlayer } from '@/context/PlayerContext';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { Disc3 } from 'lucide-react'; // Update the path accordingly

import { SetStateAction, useEffect, useState } from 'react';
import WavePlayer from '../waveplayer/WavesurferPlayer';

export default function TopTrackCard({
  track,
  index
}: {
  track: any;
  index: number;
}) {
  const [paused, setPaused] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const [playingTrack, setPlayingTrack] = useState<any>(null);

  const [playEnabled, setPlayEnabled] = useState(false);

  console.log(track, 'djdjdjj');

  const { setTrack, setIsOpen, setCurrentPlayer } = usePlayer();

  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const hasPreview = track.url !== null;

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
    }
    setPlaying(!playing);
  };

  function playPreview() {
    if (paused) {
      setPaused(false);
      // if (currentPlayer && !currentPlayer.isDestroyed && player) {
      //   if (
      //     currentPlayer.isPlaying() &&
      //     player.container.id !== currentPlayer.container.id
      //   ) {
      //     currentPlayer.seekTo(0.9999);
      //   }
      // }
      setCurrentPlayer(player);
      setIsOpen(true);
      setTrack({
        name: track.name,
        preview_url: track.preview_url,
        artist: track.artists[0].name,
        image: track.album.images[0].url,
        productLink: 'linkypoo'
      });
    } else {
      setPaused(true);
    }
  }

  return (
    <div className="group flex w-full flex-col gap-4 text-left">
      {/* <Link
        className="relative flex"
        target="_blank"
        href={track.external_urls.spotify}
      > */}
      <div className="relative flex">
        <Image
          alt={track.name}
          height={200}
          className="image-no-drag w-full rounded-sm transition-transform duration-100 ease-in-out group-hover:scale-105"
          width={200}
          src={track.album.images[0].url}
        />

        <button
          onClick={playPreview}
          className={`absolute inset-1/2 h-1/3 w-1/3 translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-100 ease-in-out hover:scale-105 hover:bg-gray-300 ${
            playing || !paused ? 'flex' : 'hidden group-hover:flex' // Update this line
          }`}
        >
          {playing || !paused ? ( // Update this line
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
      <div className="h-full w-full items-center">
        <WavePlayer
          autoplay={false}
          paused={paused}
          url={track.preview_url}
          filename={track.name}
          barHeight={0.5}
          media="null"
          onFinish={() => setPaused(true)}
          onLoad={() => setPlayEnabled(true)}
          onCreate={(p: SetStateAction<null>) => setPlayer(p)}
          resetOnPause
          onPlay={setCurrentPlayer}
          onReady={index === 0 ? setCurrentPlayer : undefined}
          waveColor="#ffffff80"
          progressColor="#ffffff"
        />
      </div>
    </div>
  );
}
