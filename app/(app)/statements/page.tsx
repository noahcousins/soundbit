import PreviewPoliticianCard from '@/components/politicians/PreviewPoliticianCard';
import Carousel from '@/components/sections/Carousel';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import SmallStatementCard from '@/components/statements/SmallStatementCard';
import StatementPreviewGrid from '@/components/statements/StatementPreviewGrid';
import StatementsGrid from '@/components/statements/StatementsGrid';
import SectionHeader from '@/components/util/SectionHeader';
import { SlideBlobOne } from '@/components/util/SvgImport';
import {
  fetchStatementsWithPoliticians,
  fetchPoliticiansByIds,
  fetchCarouselWithSlides,
  fetchSlidesById
} from '@/utils/supabase/api/legacy/api';
import { Session } from '@supabase/supabase-js';
import React from 'react';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cookies } from 'next/headers';

export const revalidate = 0;

export default async function Statements() {
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
  // Fetching statements data
  const statementsWithPoliticians = await fetchStatementsWithPoliticians(
    session
  );

  const politicianIds = statementsWithPoliticians.flatMap(
    (statement) => statement.politicianId
  );
  const politicians = await fetchPoliticiansByIds(politicianIds);

  const carousel_name = 'statements_page';

  //Fetching carousel data
  const carouselSlides = await fetchCarouselWithSlides(carousel_name);
  const slideIds = carouselSlides.flatMap((carousel) => carousel.slide_ids);
  const slides = await fetchSlidesById(slideIds);

  const statementsWithUpdatedPoliticians = statementsWithPoliticians.map(
    (statement) => ({
      ...statement,
      politicians: politicians.filter((politician) =>
        statement.politicianId!.includes(politician.id)
      )
    })
  );

  // Count the occurrences of each politicianId
  const politicianIdCount: { [key: string]: number } = {}; // Define the type explicitly

  politicianIds.forEach((id) => {
    if (id) {
      if (politicianIdCount[id]) {
        politicianIdCount[id]++;
      } else {
        politicianIdCount[id] = 1;
      }
    }
  });

  // Find the top 3 occurring politicianIds
  const top3PoliticianIds = Object.entries(politicianIdCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map((entry) => entry[0]);

  const top3Politicians = await fetchPoliticiansByIds(top3PoliticianIds);

  console.log(session, 'cnanan');

  return (
    <main className="relative flex min-h-screen w-full flex-col items-start gap-16 lg:gap-24">
      <div className="bg-glow-3 absolute">
        <SlideBlobOne fillColor={'purple'} />
      </div>

      <Carousel slides={slides} />

      <HorizontalGallery
        heading="Statements"
        description={`Hear the latest statements about UAP given.`}
        link="/statements"
      >
        {statementsWithUpdatedPoliticians.slice(0, 8).map((statement) => (
          <div className="w-fit snap-start" key={statement.id}>
            <SmallStatementCard
              statement={statement}
              index={undefined}
              loading={undefined}
              session={session}
            />
          </div>
        ))}
      </HorizontalGallery>
      <HorizontalGallery
        heading="Top Politicians"
        description={`The most active congress members in the UAP discussion.`}
        link="/politicians"
      >
        {top3Politicians.map((politician) => (
          <div className="snap-start" key={politician.handle}>
            <PreviewPoliticianCard politician={politician} />
          </div>
        ))}
      </HorizontalGallery>
      <StatementPreviewGrid
        statementsWithUpdatedPoliticians={statementsWithUpdatedPoliticians}
      />

      <div className="flex w-full flex-col content-between justify-between gap-8">
        <SectionHeader
          heading={'All Statements'}
          description={'Explore all statements by politicians.'}
        />
        <StatementsGrid statementsData={statementsWithUpdatedPoliticians} />
      </div>
    </main>
  );
}
