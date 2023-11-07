import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import AuthButton from '@/components/AuthButton';
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps';
import DeployButton from '@/components/DeployButton';
import Header from '@/components/Header';
import Pricing from '@/components/Pricing';
import SignUpUserSteps from '@/components/SignUpUserSteps';
import NavLinks from '@/components/layout/NavLinks';
import SmallLegislationCard from '@/components/legislation/SmallLegislationCard';
import PreviewPoliticianCard from '@/components/politicians/PreviewPoliticianCard';
import Carousel from '@/components/sections/Carousel';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import SmallStatementCard from '@/components/statements/SmallStatementCard';
import {
  fetchPoliticiansAndCounts,
  fetchStatements,
  fetchLegislationsWithPoliticians,
  fetchCarouselWithSlides,
  fetchSlidesById
} from '@/utils/supabase/api';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const carousel_name = 'statements_page';

export default async function Explore() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  const isSupabaseConnected = canInitSupabaseClient();

  const politicians = await fetchPoliticiansAndCounts();
  const { statementsData } = await fetchStatements();
  const legislations = await fetchLegislationsWithPoliticians();

  //Fetching carousel data
  const carouselSlides = await fetchCarouselWithSlides(carousel_name);
  const slideIds = carouselSlides.flatMap((carousel) => carousel.slide_ids);
  const slides = await fetchSlidesById(slideIds);

  console.log(legislations, 'zooweee');

  // Generate statement cards
  const statementCards = statementsData?.map((statement) => (
    <div key={statement.id} className="snap-start">
      <SmallStatementCard
        statement={statement}
        index={undefined}
        loading={undefined}
        session={undefined}
      />
    </div>
  ));

  // Generate politician cards
  const politicianCards = politicians.map((politician) => (
    <div className="snap-start" key={politician.handle}>
      <PreviewPoliticianCard politician={politician} />
    </div>
  ));

  // Generate legislation cards
  const legislationCards = legislations.map((legislation) => (
    <div className="w-fit snap-start" key={legislation.title}>
      <SmallLegislationCard
        legislation={legislation}
        index={undefined}
        session={undefined}
      />
    </div>
  ));

  return (
    <div className="w-full flex flex-col gap-20 text-primary items-center">
      <Carousel slides={slides} />
      <HorizontalGallery
        heading="Politicians"
        description="Meet the politicians leading the conversation on UAPs and explore their perspectives."
        link="/legislations"
      >
        {politicianCards}
      </HorizontalGallery>
      <HorizontalGallery
        heading="Latest Statements"
        description={`Discover the latest remarks about UAPs straight from the politicians themselves.`}
        link="/statements"
      >
        {statementCards}
      </HorizontalGallery>
      <HorizontalGallery
        heading="Recent Legislation"
        description={`Read the newest legal language about UAP, straight from DC.`}
        link="/legislation"
      >
        {legislationCards}
      </HorizontalGallery>
      here
      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
      here
      <div className="w-full">
        <div className="flex w-full flex-col items-center lg:flex-row">
          <div className="w-full p-0 lg:w-1/2 lg:p-24">
            <h3 className="text-2xl font-semibold">Browse by politician.</h3>
            <p className="text-base font-normal">
              Explore statements and legislation made by politicians about UAP.
            </p>
          </div>
          <div className="w-full p-0 lg:w-1/2 lg:p-24">
            <div className="h-72 w-full rounded-2xl bg-primary/5"></div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center lg:flex-row">
          <div className="order-2 w-full p-0 lg:order-1 lg:w-1/2 lg:p-24">
            <div className="h-72 w-full rounded-2xl bg-primary/5"></div>
          </div>
          <div className="order-1 w-full p-0 lg:order-2 lg:w-1/2 lg:p-24">
            <h3 className="text-2xl font-semibold">Voice your opinion.</h3>
            <p className="text-base font-normal">
              Like statements and vote on legislation to affect the Bipartisan
              Index, a realtime snapshot of the UAP political climate.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center lg:flex-row">
          <div className="w-full p-0 lg:w-1/2 lg:p-24">
            <h3 className="text-2xl font-semibold">Closest thing to a SCIF.</h3>
            <p className="text-base font-normal">
              Keep up to date on the latest UAP hearings in DC.
            </p>
          </div>
          <div className="w-full p-0 lg:w-1/2 lg:p-24">
            <div className="h-72 w-full rounded-2xl bg-primary/5"></div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center lg:flex-row">
          <div className="w-full p-0 lg:w-1/2 lg:p-24">
            <h3 className="text-2xl font-semibold">Coming soon</h3>
            <p className="text-base font-normal">
              Templated letters to easily send to your congresspeople,{' '}
            </p>
          </div>
          <div className="w-full p-0 lg:w-1/2 lg:p-24">
            <div className="h-72 w-full rounded-2xl bg-primary/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
