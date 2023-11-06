import PoliticianBlip from "@/components/politicians/PoliticianBlip";
import Breadcrumbs from "@/components/util/Breadcrumbs";
import SmallStatementCard from "@/components/statements/SmallStatementCard";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import Gauge from "@/components/statements/Gauge";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchStatement,
  fetchStatementPolitician,
  fetchOtherStatements,
} from "@/utils/supabase/api"; // Import functions from your API file
import { getBackgroundColor } from "@/utils/formatUtils";
import ValueColoredBlob from "@/components/util/ValueColoredBlob";
import LikeButton from "@/components/interaction/LikeButton"; // Adjust the path accordingly

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function Statement({ params }: { params: any }) {
  const { handle } = params;

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const statement = await fetchStatement(handle);

  const politician = await fetchStatementPolitician(statement!.politicianId!);
  const otherStatements = await fetchOtherStatements(statement!.politicianId);

  const mappedDisclosureValue = ((statement!.disclosureScore! + 10) / 20) * 100;
  const mappedBipartisanValue = ((statement!.bipartisanScore! + 10) / 20) * 100;

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-16 py-12 lg:gap-24">
      <div className="flex w-full justify-between">
        <Breadcrumbs
          items={[
            { name: "Statements", link: "/statements" },
            { name: statement!.subject },
          ]}
        />
      </div>

      <div className="flex w-full gap-8 px-4 md:px-0 lg:px-12">
        <div className="absolute left-12 flex md:left-44 lg:left-64">
          <ValueColoredBlob value={statement!.bipartisanScore} />
        </div>

        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-1 flex-shrink basis-1/4 flex-col items-center justify-center">
            <div className="relative flex flex-col gap-6">
              <div className="absolute -left-11 -top-12 select-none">
                <span className="text-scale-600 text-[160px] leading-none text-primary/25">
                  &ldquo;
                </span>
              </div>
              <blockquote className="z-10 max-w-lg text-xl lg:text-3xl">
                {statement?.quote}
              </blockquote>
              <PoliticianBlip politician={politician} isSmall={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-16 md:flex-row">
        <div className="flex h-full w-full flex-col gap-4 lg:w-2/3">
          <div className="flex w-full items-center justify-between gap-24">
            <div className="flex flex-col">
              <p className="text-sm font-light uppercase">
                {new Date(statement!.date!).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3 className="text-xl lg:text-2xl">{statement!.text}</h3>
            </div>
            <LikeButton session={session} statementId={statement!.id} />
          </div>

          <p className="text-left font-light text-primary">{statement!.text}</p>
        </div>
        <div className="flex h-full w-1/3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-full w-full flex-col items-center gap-1">
                  {/* @ts-ignore */}
                  <Gauge
                    value={mappedBipartisanValue}
                    label={undefined}
                    units={undefined}
                    min={0}
                    max={100}
                  />
                  <p className="text-center text-xs font-light uppercase">
                    Bipartisan index
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="normal-case">
                  A range representing the politicial range from right to left.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-full w-full flex-col items-center gap-1">
                  <Gauge value={mappedDisclosureValue} />
                  <p className="text-center text-xs font-light uppercase">
                    Disclosure score
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="normal-case">
                  A rating that represents the effect on disclosure of this data
                  point.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
      </div>

      <HorizontalGallery
        heading="Other Statements"
        description={`Check out statements similar this one by ${
          politician!.name
        }.`}
        link="/legislations"
      >
        {otherStatements.map((otherStatement) => (
          <div className="w-fit snap-start" key={statement!.id}>
            <SmallStatementCard
              statement={otherStatement}
              index={undefined}
              loading={undefined}
              session={undefined}
            />
          </div>
        ))}
      </HorizontalGallery>
      {/*       <div className="flex w-full flex-wrap gap-8">
        <div className="flex w-full flex-col">
          <div className="flex w-full gap-8">
            <StatementCard
              statements={otherStatements}
              politician={politician}
              contentOnLeft={true}
            />

             <div className="border-scale-500 hover:border-scale-700 dark:bg-scale-300 group relative flex w-full flex-col justify-between overflow-hidden rounded-sm border-[1px] border-white border-opacity-10 p-8 text-left transition-all duration-100 hover:border-opacity-50">
              <div className="m-auto text-center">
                <p className="">+ 3 other statements</p>
                <p className="">view all</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </main>
  );
}
