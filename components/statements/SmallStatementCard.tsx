"use client";

import Link from "next/link";
import StatementIcon from "@/components/icons/StatementIcon";
import { formatDate } from "@/utils/formatUtils";

import { Skeleton } from "@/components/ui/skeleton";
import LikeButton from "@/components/interaction/LikeButton";
import PoliticiansPreview from "@/components/politicians/PoliticiansPreview";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SmallStatementCard({
  statement,
  index,
  loading,
  session,
}: {
  statement: any;
  index: any;
  loading: any;
  session: any;
}) {
  if (loading) {
    return (
      <div
        key={index}
        className="relative flex h-[200px] w-[350px] flex-col rounded-2xl border-[1px] border-white border-opacity-10"
      >
        <Skeleton className="absolute z-10 h-full w-full opacity-5" />
        <div className="z-20 my-auto flex w-full flex-col content-between justify-between gap-4 p-8">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-[28px] w-[126px] rounded-full" />
          <Skeleton className="h-[20px] w-[33px] rounded-full" />
        </div>
      </div>
    ); // Show loading message
  }

  return (
    <div key={index} className="w-fit snap-start overflow-hidden">
      <div className="flex h-[220px] w-[350px] flex-col content-between justify-between gap-4 rounded-2xl border-[1px] border-transparent bg-foreground/5 p-8 transition-all duration-100 ease-in-out hover:border-white/50 hover:bg-foreground/10">
        <div className="flex w-full items-center justify-between">
          <StatementIcon />
          <PoliticiansPreview politicians={statement.politicians} />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-primary/60">
            {formatDate(statement.date)}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/statements/${statement?.handle}`}>
                  <h4 className="h-full text-left font-semibold text-primary line-clamp-1">
                    {statement.subject}
                  </h4>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-left">{statement.subject}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Link className="relative" href={`/statements/${statement?.handle}`}>
          <div className="absolute -left-4 -top-4 select-none">
            <span className="text-scale-600 text-[64px] leading-none text-primary/20">
              &ldquo;
            </span>
          </div>
          <p className="text-xs text-primary/60 line-clamp-2">
            {statement.quote}
          </p>
        </Link>

        {session && <LikeButton statementId={statement.id} session={session} />}
      </div>
    </div>
  );
}
