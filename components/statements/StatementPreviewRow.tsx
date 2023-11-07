import PoliticiansPreview from '../politicians/PoliticiansPreview';
import StatementIcon from '@/components/icons/StatementIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { formatDate } from '@/utils/formatUtils';
import Link from 'next/link';

export default function StatementPreviewRow({
  statement,
  index
}: {
  statement: any;
  index: any;
}) {
  return (
    <div
      key={index}
      className="relative z-10 flex h-1/5 w-full items-center justify-between rounded-2xl border-[1px] border-primary/0 bg-primary/5 p-4 transition-all duration-200 ease-in-out line-clamp-1 hover:border-primary/50 hover:bg-primary/0"
    >
      <div className="pointer-events-none absolute z-[8] text-xl font-light text-primary/5 blur-sm transition-all duration-500 ease-in-out hover:text-primary/0">
        {statement.quote}
      </div>
      <div className="z-10 flex w-full items-center justify-between gap-2 drop-shadow-lg">
        <div className="flex items-center gap-2">
          <StatementIcon />
          <div className="flex w-fit flex-col">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={`/statements/${statement.handle}`}>
                    <h4 className="h-full text-left text-sm font-semibold text-primary line-clamp-1 lg:text-base">
                      {statement.subject}
                    </h4>
                  </Link>
                </TooltipTrigger>
                {/* <TooltipContent>
                    <p className="text-left">{statement.subject}</p>
                  </TooltipContent> */}
              </Tooltip>
            </TooltipProvider>

            <p className="z-10 text-xs opacity-80 drop-shadow-lg">
              {formatDate(statement.date)}
            </p>
          </div>
        </div>

        <PoliticiansPreview politicians={statement.politicians} />
      </div>
    </div>
  );
}
