"use client";

import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SlideBlobOne } from "@/components/util/SvgImport";
import { formatState, formatParty } from "@/utils/formatUtils"; // Adjust the import path accordingly.
import { Skeleton } from "@/components/ui/skeleton";
import { getSvgColor } from "@/utils/formatUtils";

export default function PreviewPoliticianCard({
  politician,
}: {
  politician: any;
}) {
  const [loading, setLoading] = useState(false); // Add loading state

  if (loading) {
    return (
      <div className="group relative flex h-full w-full cursor-pointer gap-8 text-left transition-all duration-100">
        <div className="flex h-full flex-col gap-4">
          <div className="flex h-full w-full">
            <Skeleton className="aspect-square h-[192px] w-[192px] rounded-full" />
          </div>

          <div className="flex h-full w-full flex-col gap-2">
            <Skeleton className="h-[16px] w-[55px] rounded-full" />

            <Skeleton className="h-[24px] w-[97px] rounded-full" />

            <Skeleton className="h-[20px] w-[35px] rounded-full" />
          </div>
        </div>
      </div>
    ); // Show loading message
  }

  return (
    <div
      key={politician.id}
      className="group relative flex h-full w-full cursor-pointer gap-8 text-left transition-all duration-100"
    >
      {/* <div className="bg-glow-5 absolute -bottom-4 -left-28 scale-50 opacity-0 transition-opacity duration-300 group-hover:opacity-40">
        <SlideBlobOne fillColor={getSvgColor(politician.party)} />
      </div> */}
      <div className="flex h-full flex-col gap-4">
        <Link href={`/politicians/${politician.handle}`}>
          <div className="relative">
            <div className={`h-48 w-48 overflow-hidden rounded-full`}>
              <Image
                className={`h-48 w-48 rounded-full grayscale-[5%] transition-all duration-200 ease-in-out hover:grayscale-0`}
                src={politician.pictureUrl}
                alt={`Image of ${politician.name}`}
                width={450}
                height={450}
              />
            </div>
          </div>
        </Link>

        <div className="flex h-full w-full flex-col">
          <div>
            <h3 className="text-xs uppercase text-primary/60">
              {politician.position}
            </h3>
            <h2 className="text-base font-bold text-primary">
              {politician.name}
            </h2>
            <p className="text-sm text-primary/60">
              {formatParty(politician.party)}
              <span className="">-{formatState(politician.state)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
