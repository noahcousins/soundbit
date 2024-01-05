'use client';

import Link from 'next/link';
import Image from 'next/image';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/src/components/ui/tooltip';

export default function SingleCard({ single }: { single: any }) {
  const year = new Date(single.release_date).getFullYear();

  return (
    <Link target="_blank" href={single.external_urls.spotify}>
      <div className="group flex w-full flex-col gap-4 text-left">
        <div className="relative flex overflow-hidden">
          <Image
            alt={single.name}
            height={200}
            className="image-no-drag w-full rounded-sm transition-transform duration-100 ease-in-out group-hover:scale-105"
            width={200}
            src={single.images[0].url}
          />
        </div>
        <div className="flex flex-col gap-1">
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
          <p className="line-clamp-1 w-fit rounded-sm bg-white/20 px-2 py-1 text-xs transition-transform duration-100 ease-in-out hover:bg-white/40 active:scale-105 active:bg-white/50">
            Released in {year}
          </p>
        </div>
      </div>
    </Link>
  );
}
