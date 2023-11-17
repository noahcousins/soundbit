// Code B

import SmallLegislationCard from '@/components/legislation/SmallLegislationCard';
import LegislationGrid from '@/components/legislation/LegislationGrid';
import SectionHeader from '@/components/util/SectionHeader';

import FeaturedLegislationSlider from '@/components/legislation/FeaturedLegislationSlider';
import { SlideBlobOne } from '@/components/util/SvgImport';

import {
  fetchLegislationsWithPoliticians,
  fetchPoliticiansByIds
} from '@/utils/supabase/api';

import HorizontalGallery from '@/components/sections/HorizontalGallery';

export const revalidate = 0;

export default async function Legislations() {
  const legislationsWithPoliticians = await fetchLegislationsWithPoliticians();
  const politicianIds = legislationsWithPoliticians.flatMap(
    (legislation) => legislation.politicianTags
  );
  const politicians = await fetchPoliticiansByIds(politicianIds);

  const legislationsWithUpdatedPoliticians = legislationsWithPoliticians.map(
    (legislation) => ({
      ...legislation,
      politicians: politicians.filter((politician) =>
        legislation.politicianTags!.includes(politician.id)
      )
    })
  );

  return (
    <main className="relative flex min-h-screen w-full flex-col items-start gap-16">
      <div className="bg-glow-3 absolute">
        <SlideBlobOne fillColor={'purple'} />
      </div>
      <FeaturedLegislationSlider
        legislationsWithUpdatedPoliticians={legislationsWithUpdatedPoliticians}
      />

      {/* <HorizontalGallery
        heading="Trending Legislation"
        description={`The hottest legislation straight from DC.`}
        link="/legislation"
        gap="gap-48 sm:gap-36"
      >
        {legislationsWithUpdatedPoliticians.map((legislation) => (
          <div className="w-fit snap-start" key={legislation.id}>
            <SmallLegislationCard legislation={legislation} />
          </div>
        ))}
      </HorizontalGallery> */}

      <div className="flex w-full flex-col content-between justify-between gap-8">
        <SectionHeader
          heading={'Browse legislation.'}
          description={'Explore all UAP related legislation.'}
        />
        <LegislationGrid
          legislationsWithUpdatedPoliticians={
            legislationsWithUpdatedPoliticians
          }
        />
      </div>
    </main>
  );
}
