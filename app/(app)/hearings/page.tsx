import EventCard from "@/components/politicians/EventCard";
import VerticalGallery from "@/components/sections/VerticalGallery";
import {
  fetchEventsWithPoliticians,
  fetchPoliticiansByIds,
} from "@/utils/supabase/api"; // Adjust with your API functions import

import { MapPin } from "lucide-react";

export const revalidate = 0;

export default async function Events() {
  const eventsWithPoliticians = await fetchEventsWithPoliticians();
  const politicianIds = eventsWithPoliticians.flatMap(
    (event) => event.politicianTags
  );
  const politicians = await fetchPoliticiansByIds(politicianIds);

  const eventsWithUpdatedPoliticians = eventsWithPoliticians.map((event) => ({
    ...event,
    politicians: politicians.filter((politician) =>
      event.politicianTags!.includes(politician.id)
    ),
  }));

  return (
    <main className="flex min-h-screen flex-col gap-16 py-8">
      <div className="mx-auto flex h-96 w-full items-center rounded-2xl bg-primary/10 p-24">
        <div className="mx-auto my-auto flex h-full w-1/2 flex-col items-center justify-center">
          <h3 className="mx-auto w-fit text-center text-4xl font-semibold">
            No hearings soon...
          </h3>
          <p className="mx-auto w-full text-center text-sm">
            There&apos;s no intel on any congressional hearings on UAP currently
            scheduled. Once Congress schedules the next one, come back to this
            page to be briefed.
          </p>
        </div>
      </div>
      <div className="flex w-full">
        <VerticalGallery
          heading="Events"
          description={` ${
            eventsWithUpdatedPoliticians &&
            eventsWithUpdatedPoliticians.length > 0
              ? `Check out past UAP hearings.`
              : `Sorry, no hearings on UAP have occured yet.`
          }`}
          link="/hearings"
        >
          <EventCard events={eventsWithUpdatedPoliticians} />
        </VerticalGallery>
      </div>
    </main>
  );
}
