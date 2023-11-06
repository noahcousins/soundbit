import { formatDate } from "@/utils/formatUtils";

import Link from "next/link";
import VoteButton from "@/components/interaction/VoteButton";
import LegislationIcon from "@/components/icons/LegislationIcon";
import PoliticiansPreview from "@/components/politicians/PoliticiansPreview";

export default function LegislationCard({
  legislation,
  index,
  session,
}: {
  legislation: any;
  index: any;
  session: any;
}) {
  return (
    <div className="snap-start overflow-hidden">
      <div className="flex h-[350px] w-[280px] flex-col content-between justify-between gap-4 rounded-2xl bg-foreground/5 p-8">
        <div className="flex flex-col gap-8">
          <LegislationIcon />
          <div className="flex flex-col">
            <h4 className="font-regular text-primary">{legislation?.bill}</h4>
            <Link key={index} href={`/legislation/${legislation?.handle}`}>
              <h4 className="break-words font-semibold text-primary line-clamp-3">
                {legislation?.title}
              </h4>
            </Link>
          </div>
        </div>

        {/* <div className="flex flex-col">
          {firstPolitician && (
            <PoliticianBlip isSmall={true} politician={firstPolitician} />
          )}
          {otherPoliticiansCount > 0 && (
            <p className="text-xs text-primary/60">
              {`+ ${otherPoliticiansCount} other politician${
                otherPoliticiansCount === 1 ? "" : "s"
              }`}
            </p>
          )}
        </div> */}
        <div className="flex flex-col gap-2">
          <PoliticiansPreview politicians={legislation.politicians} />
          <p className="text-xs text-primary/60">
            {formatDate(legislation?.date)}
          </p>
        </div>

        {session && (
          <VoteButton legislationId={legislation.id} session={session} />
        )}
      </div>
    </div>
  );
}
