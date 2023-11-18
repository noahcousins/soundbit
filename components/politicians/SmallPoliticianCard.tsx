import LegislationIcon from '@/components/icons/LegislationIcon';
import StatementIcon from '@/components/icons/StatementIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  formatState,
  formatParty,
  getBackgroundColor
} from '@/utils/formatUtils';
import { Mic, ScrollText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Adjust the import path accordingly.

export default function SmallPoliticianCard({
  politician,
  legislationCount,
  statementCount
}: {
  politician: any;
  legislationCount: number;
  statementCount: number;
}) {
  return (
    <div className="border-scale-500 hover:border-scale-700 dark:bg-scale-300 group relative flex w-full cursor-pointer justify-between overflow-hidden rounded-2xl border-opacity-10 bg-white/5 p-4 text-left transition-all duration-100 hover:border-opacity-50">
      {politician && (
        <div
          style={{
            background: getBackgroundColor(politician.party)
          }}
          className="absolute left-0 top-0 h-[150px] w-[250px] scale-100 transform opacity-50 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100"
        ></div>
      )}
      {politician && (
        <div className="flex h-full w-full flex-col justify-between">
          <div
            key={politician.id}
            className="my-auto flex h-full items-center justify-between gap-4"
          >
            {/* Politician's picture */}
            <Link href={`/politicians/${politician.handle}`}>
              <div className="my-auto flex h-fit w-full flex-col items-center space-x-0 space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
                <div
                  className={`w-fit rounded-full sm:flex-shrink-0 ${
                    politician.party === 'Republican'
                      ? 'ring-0 transition-transform duration-200 hover:ring-8 hover:ring-red-500'
                      : 'ring-0 transition-transform duration-200 hover:ring-8 hover:ring-blue-500'
                  }`}
                >
                  <Image
                    layout="fit"
                    width={450}
                    height={450}
                    alt={`Image of ${politician.name}`}
                    className={`h-fit w-32 rounded-full object-cover grayscale-[5%] transition-all duration-200 ease-in-out hover:scale-110 hover:grayscale-0 `}
                    src={politician.pictureUrl}
                  />
                </div>
              </div>
            </Link>

            <div className="flex h-fit w-full items-center justify-between gap-4">
              <div className="flex w-fit flex-col">
                {/* Politician's position, name, party, and state */}
                <div className="flex justify-between">
                  <h3 className="flex-grow text-left text-sm font-extralight uppercase text-primary opacity-60">
                    {politician.position === 'Representative'
                      ? 'Rep.'
                      : politician.position === 'Senator'
                      ? 'Sen.'
                      : politician.position}
                  </h3>
                  <p className="text-left text-sm font-extralight text-primary opacity-60">
                    {formatParty(politician.party)}
                    <span className="">-{formatState(politician.state)}</span>
                  </p>
                </div>

                <h2 className="w-full text-xl font-semibold leading-tight text-primary">
                  {politician.name}
                </h2>
              </div>

              <div className="z-30 flex flex-col gap-2">
                {/* Total statements and legislation */}
                <p className="flex items-center gap-2 text-sm text-primary">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <StatementIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{statementCount} statements</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {statementCount}
                </p>

                <p className="flex items-center gap-2 text-sm text-primary">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <LegislationIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{legislationCount} pieces of legislation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {legislationCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
