'use client';

import Link from 'next/link';
import Image from 'next/image';

import { FaPlay, FaPause } from 'react-icons/fa';
import { usePlayer } from '@/context/PlayerContext';
import { usePlayback } from '@/context/PlaybackContext'; // Update the path accordingly

import { useEffect, useState } from 'react';

export default function AlbumCard({ album }: { album: any }) {
  const year = new Date(album.release_date).getFullYear();

  return (
    <div className="group flex w-full flex-col gap-4 text-left">
      {/* <Link
        className="relative flex"
        target="_blank"
        href={track.external_urls.spotify}
      > */}
      <div className="relative flex">
        <Image
          alt={album.name}
          height={200}
          className="image-no-drag w-full rounded-sm transition-transform duration-100 ease-in-out group-hover:scale-105"
          width={200}
          src={album.images[0].url}
        />
      </div>
      {/* </Link> */}

      <div className="flex flex-col gap-1">
        <Link target="_blank" href={album.external_urls.spotify}>
          <p className="line-clamp-1 text-base">{album.name}</p>
        </Link>
        <Link target="_blank" href={album.external_urls.spotify}>
          <p className="line-clamp-1 w-fit rounded-sm bg-white/20 px-2 py-1 text-xs transition-transform duration-100 ease-in-out hover:bg-white/40 active:scale-105 active:bg-white/50">
            Released in {year}
          </p>
        </Link>
      </div>
    </div>
  );
}
