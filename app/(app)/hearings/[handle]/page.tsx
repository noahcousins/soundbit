import PoliticianBlip from "@/components/politicians/PoliticianBlip";
import Breadcrumbs from "@/components/util/Breadcrumbs";
import EventCard from "@/components/politicians/EventCard";
import VerticalGallery from "@/components/sections/VerticalGallery";
import {
  fetchEvent,
  fetchPoliticians,
  fetchOtherEvents,
} from "@/utils/supabase/api"; // Import functions from your API file

import { MapPin } from "lucide-react";

export const revalidate = 0;

// Define the Event component
export default async function Event({ params }: { params: any }) {
  const { handle } = params;

  const event = await fetchEvent(handle);

  const politicians = await fetchPoliticians(event!.politicianTags);
  const otherEvents = await fetchOtherEvents(handle);

  const showAllPoliticians = false; // or true based on your logic

  return (
    <main className="mx-auto flex max-w-screen-2xl flex-col gap-24 py-8">
      <div className="flex flex-col gap-8">
        <Breadcrumbs
          items={[{ name: "Events", link: "/events" }, { name: event!.title }]}
        />
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="border-scale-500 hover:border-scale-700 dark:bg-scale-300 group relative flex w-full gap-8 overflow-hidden rounded-2xl border-[1px] border-white border-opacity-10 p-8 text-left transition-all duration-100 hover:border-opacity-50 lg:w-3/4">
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent opacity-5"></div>

            <div className="flex flex-col">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                  <MapPin
                    className="flex rounded-full bg-white bg-opacity-10 px-1 transition-opacity duration-100 ease-in-out hover:bg-opacity-25"
                    size={24}
                  />
                  <p className="w-full text-left text-sm font-light uppercase">
                    {event!.location}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="w-3/4 text-4xl font-bold">{event!.title}</h3>
                  <p className="text-base">
                    {new Date(event!.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="z-40 flex">
                  {politicians.length > 0 && (
                    <div className="flex w-full gap-8">
                      <div className="flex w-full flex-col gap-2 lg:flex-row lg:gap-8">
                        {politicians
                          .slice(0, showAllPoliticians ? politicians.length : 2)
                          .map((politician) => (
                            <PoliticianBlip
                              isSmall={true}
                              key={politician.id}
                              politician={politician}
                            />
                          ))}
                      </div>
                      {politicians.length > 2 && (
                        <div className="my-auto w-full text-sm">
                          <p className="">+ {politicians.length - 2} more</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-scale-500 hover:border-scale-700 dark:bg-scale-300 group relative flex w-full cursor-pointer gap-8 overflow-hidden rounded-2xl border-white border-opacity-10 p-8 text-left transition-all duration-100 hover:border-opacity-50 lg:w-1/4">
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent opacity-5"></div>
            <div className="mx-auto my-auto flex flex-col text-center">
              <h4 className="text-5xl font-medium">24 MAR</h4>
              <p className="text-7xl font-bold">2023</p>
              <p className="text-2xl font-light italic">countdown here</p>
            </div>
          </div>
        </div>
        <p className="text-base font-light">{event!.description}</p>
      </div>

      <VerticalGallery
        heading="Other Events"
        description={` ${
          otherEvents && otherEvents.length > 0
            ? `Checkout the hearings participated in.`
            : `No hearings attendoned by.`
        }`}
        link="/hearings"
      >
        <EventCard events={otherEvents} />
        {/* <div className="border-scale-500 hover:border-scale-700 dark:bg-scale-300 group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border-[1px] border-white border-opacity-10 p-4 text-left transition-all duration-100 hover:border-opacity-50">
          <div className="m-auto text-center">
            <p>+ {otherEvents.length} other events</p>
            <p>view all</p>
          </div>
        </div> */}
      </VerticalGallery>
    </main>
  );
}
