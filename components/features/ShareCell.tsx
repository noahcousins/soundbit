export default function ShareCell({ person }: { person: any }) {
  return (
    <div
      className={`flex w-28 items-center gap-1 rounded-full border-[1px] ${
        person.active ? 'bg-[#FF2E01]' : 'bg-white/10'
      } border-white/20 p-1`}
    >
      <div className="relative aspect-square h-auto w-1/3 rounded-full bg-white/50">
        <img
          height={256}
          className="absolute bottom-0"
          width={256}
          alt="Noah Cousins headshot"
          src={person.src}
        />
      </div>
      <div className="flex w-2/3 flex-col gap-1 pr-4">
        <div
          className={`h-1 w-full rounded-full ${
            person.active ? 'bg-black/50' : 'bg-white/25'
          }`}
        ></div>
        <div
          className={`h-1 w-3/4 rounded-full ${
            person.active ? 'bg-black/50' : 'bg-white/25'
          }`}
        ></div>
      </div>
    </div>
  );
}
