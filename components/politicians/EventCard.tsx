import Link from "next/link";
import PoliticiansPreview from "@/components/politicians/PoliticiansPreview";
import HearingIcon from "@/components/icons/HearingIcon";
import PinIcon from "@/components/icons/PinIcon";

export default function EventCard({ events }: { events: any }) {
  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        {events.map((event: any, index: any) => (
          <div
            key={index}
            className="my-auto flex items-center justify-between rounded-2xl border-[1px] border-primary/0 bg-primary/5 p-4 transition-all duration-200 ease-in-out hover:border-primary/10 hover:bg-primary/0"
          >
            <div className="flex items-center gap-2">
              <HearingIcon />
              <Link href={`/hearings/${event.handle}`}>
                <h4 className="w-96 font-medium line-clamp-1">{event.title}</h4>
              </Link>
            </div>

            <PoliticiansPreview politicians={event.politicians} />
            <div className="flex items-center gap-2">
              <PinIcon />
              <Link href={`/search?q=${event.location}`}>
                <p className="w-full text-left text-sm font-normal uppercase">
                  {event.location}
                </p>
              </Link>
            </div>
            <Link href={`/search?q=${formatDate(event.date)}`}>
              <p className="text-xs text-primary/60">
                {formatDate(event.date)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
