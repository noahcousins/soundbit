// Import necessary modules from 'react'

import VoteButton from '@/components/interaction/VoteButton';
import LegislationWizard from '@/components/legislation/LegislationWizard';
import SmallLegislationCard from '@/components/legislation/SmallLegislationCard';
import PoliticianBlip from '@/components/politicians/PoliticianBlip';
import SmallPoliticianCard from '@/components/politicians/SmallPoliticianCard';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import Gauge from '@/components/statements/Gauge';
// Import functions from your API file

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Breadcrumbs from '@/components/util/Breadcrumbs';
import ValueColoredBlob from '@/components/util/ValueColoredBlob';
import {
  fetchLegislation,
  fetchPoliticians,
  fetchOtherLegislations
} from '@/utils/supabase/api/legacy/api';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { ScrollText, Dot, ChevronRight } from 'lucide-react';
import { cookies } from 'next/headers';

export async function generateMetadata({ params }: { params: any }) {
  const { handle } = params;
  const legislation = await fetchLegislation(handle);
  return {
    title: `"${legislation?.title}" - UAPoli`
  };
}

export const revalidate = 0;

export default async function Legislation({ params }: { params: any }) {
  const { handle } = params;

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    }
  );
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const legislation = await fetchLegislation(handle);
  if (!legislation) {
    return <div>Loading...</div>;
  }

  const politicians = await fetchPoliticians(legislation.politicianTags);
  const otherLegislations = await fetchOtherLegislations(handle);

  const showAllPoliticians = false; // or true based on your logic

  const mappedDisclosureValue =
    ((legislation.disclosureScore! + 10) / 20) * 100;
  const mappedBipartisanValue =
    ((legislation.bipartisanScore! + 10) / 20) * 100;

  const stages = [
    { value: 1, label: 'Bill Proposed' },
    { value: 2, label: 'Passed the House' },
    { value: 3, label: 'Passed the Senate' },
    { value: 4, label: 'Signed by President' }
  ];

  const currentStage = legislation.stage; // Assuming legislation.stage is available

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-8 lg:gap-12">
      <Breadcrumbs
        items={[
          { name: 'Legislation', link: '/legislation' },
          { name: legislation.title }
        ]}
      />
      <div className="flex w-full flex-col gap-24">
        <div className="flex w-full flex-col gap-24">
          <ValueColoredBlob value={legislation.bipartisanScore} />

          {/* New animated timeline section */}

          <div className="z-10 flex w-full flex-col gap-16 lg:flex-row lg:gap-8">
            <div className="flex h-full w-full flex-col content-between justify-between gap-8 lg:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <ScrollText className="h-16 w-16 justify-end text-primary opacity-10" />
                    <p className="w-full text-left text-xl font-light md:text-2xl">
                      {legislation.bill}
                    </p>{' '}
                  </div>
                  <VoteButton
                    session={session}
                    legislationId={legislation.id}
                  />
                </div>
                <h3 className="text-3xl font-bold">{legislation.title}</h3>
                <p className="text-base font-light uppercase">
                  {new Date(legislation.date!).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <ul className="flex list-disc flex-col gap-4">
                {legislation.bulletPoints!.map((point: any, index: any) => (
                  <li key={index} className="flex list-disc">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex w-full flex-col gap-8 lg:w-1/2">
              <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-b from-primary to-transparent opacity-5"></div>

              <div className="flex w-full flex-col gap-8">
                <div className="flex flex-1 flex-shrink basis-1/4 flex-col items-center justify-center p-8">
                  <div className="relative flex flex-col gap-6">
                    {/* <div className="absolute -left-11 -top-12 select-none">
                    <span className="text-scale-600 text-[160px] leading-none text-primary/25">
                      &ldquo;
                    </span>
                  </div> */}
                    <LegislationWizard legislation={legislation} />

                    <blockquote className="z-10 max-w-lg text-xl lg:text-2xl">
                      ... {legislation?.excerpt}
                    </blockquote>
                  </div>
                </div>
              </div>
              <p className="text-center">read the full legislation here</p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-16 md:flex-row">
          <div className="flex h-full w-full flex-col gap-4 lg:w-3/4">
            <div className="flex w-full items-center justify-between gap-24">
              <div className="flex flex-col">
                <p className="text-base font-light uppercase">
                  {new Date(legislation.date!).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <h3 className="text-2xl">{legislation.title}</h3>
              </div>
            </div>

            <p className="text-left font-light text-primary">
              {legislation.description}
            </p>
          </div>
          <div className="h-ful flex w-full lg:w-1/2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-full w-full flex-col items-center gap-1">
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
                    A range representing the politicial range from right to
                    left.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* 
            <TooltipProvider>
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
                    A rating that represents the effect on disclosure of this
                    data point.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </div>
        </div>

        <div className="flex w-full">
          {politicians.length > 0 && (
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {politicians.map((politician) => (
                <SmallPoliticianCard
                  key={politician.id}
                  politician={politician}
                  legislationCount={0}
                  statementCount={0}
                />
              ))}
            </div>
          )}
        </div>

        {/* <HorizontalGallery
          heading="Other Legislation"
          description={`Check out legislations similar to ${legislation.title}.`}
          link="/legislations"
          key={legislation.title}
        >
          {otherLegislations.map((otherLegislation) => (
            <div className="w-full snap-start" key={legislation.title}>
              <SmallLegislationCard legislation={otherLegislation} />
            </div>
          ))}
        </HorizontalGallery> */}
      </div>
    </main>
  );
}
