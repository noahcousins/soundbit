import { SlideBlobOne } from '@/components/util/SvgImport';
import Breadcrumbs from '@/components/util/Breadcrumbs';
import PoliticianDetails from '@/components/politicians/PoliticianDetails';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import VerticalGalley from '@/components/sections/VerticalGallery';

import SmallStatementCard from '@/components/statements/SmallStatementCard';
import SmallLegislationCard from '@/components/legislation/SmallLegislationCard';
import EventCard from '@/components/politicians/EventCard';

import { getSvgColor } from '@/utils/formatUtils';

import {
  fetchPoliticianDetails,
  fetchPoliticianStatements,
  fetchPoliticianLegislations,
  fetchPoliticianEvents,
  fetchSimilarPoliticians
} from '@/utils/supabase/api/politicians'; // Import the new functions
import PreviewPoliticianCard from '@/components/politicians/PreviewPoliticianCard';

export async function generateMetadata({ params }: { params: any }) {
  const { handle } = params;
  const politician = await fetchPoliticianDetails(handle);
  return {
    title: `${politician?.name} - UAPoli`
  };
}

export const revalidate = 0;

export default async function Politician({ params }: { params: any }) {
  const { handle } = params;

  const politician = await fetchPoliticianDetails(handle);
  const similarPoliticians = await fetchSimilarPoliticians(politician!.id);
  const statements = await fetchPoliticianStatements(politician!.id);
  const legislations = await fetchPoliticianLegislations(politician!.id);
  const events = await fetchPoliticianEvents(politician!.id);

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-10">
      <div className="z-10 flex">
        <Breadcrumbs
          items={[
            { name: 'Politicians', link: '/politicians' },
            { name: politician!.name }
          ]}
        />
      </div>
      <div className="flex w-full flex-col gap-24">
        <div className="bg-glow-4 absolute">
          <SlideBlobOne fillColor={getSvgColor(politician!.party)} />
        </div>
        <div className="flex h-full w-full flex-col gap-8 lg:flex-row">
          <PoliticianDetails politician={politician} />
        </div>

        <HorizontalGallery
          heading="Statements"
          description={` ${
            statements && statements.length > 0
              ? `Hear the latest statements about UAP given by ${
                  politician!.name
                }.`
              : `No statements about UAP given by ${politician!.name}.`
          }`}
          link="/statements"
          key={politician!.name}
        >
          {statements.map((statement) => (
            <div className="w-full snap-start" key={statement.id}>
              <SmallStatementCard
                statement={statement}
                index={undefined}
                loading={undefined}
                session={undefined}
              />
            </div>
          ))}
        </HorizontalGallery>

        <HorizontalGallery
          heading="Legislation"
          description={` ${
            statements && statements.length > 0
              ? `Read the newest legislation cosigned by ${politician!.name}.`
              : `No legislation about UAP cosponsored by ${politician!.name}.`
          }`}
          link="/legislation"
          key={politician!.name}
        >
          {legislations.map((legislation) => (
            <div className="w-fit snap-start" key={legislation.id}>
              <SmallLegislationCard
                legislation={legislation}
                index={undefined}
                session={undefined}
              />
            </div>
          ))}
        </HorizontalGallery>

        <VerticalGalley
          heading="Events"
          description={` ${
            events && events.length > 0
              ? `Checkout the hearings ${politician!.name} participated in.`
              : `No hearings attended by ${politician!.name}.`
          }`}
          link="/hearings"
          key={politician!.name}
        >
          <EventCard events={events} />
        </VerticalGalley>

        <HorizontalGallery
          heading="Similar Politicians"
          description={`Find politicians similar to ${politician!.name}.`}
          link="/statements"
          key={politician!.name}
        >
          {similarPoliticians.map((similarPolitician, index) => (
            <div className="snap-start" key={index}>
              <PreviewPoliticianCard politician={similarPolitician} />
            </div>
          ))}
        </HorizontalGallery>
      </div>
    </main>
  );
}
