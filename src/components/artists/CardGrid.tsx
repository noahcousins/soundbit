import { Separator } from '../ui/separator';

export default function CardGrid({
  title,
  children,
  artistSiteData
}: {
  title: any;
  children: any;
  artistSiteData: any;
}) {
  console.log(artistSiteData);
  return (
    <div className="flex w-full max-w-7xl flex-col gap-4">
      <div className="flex h-16 w-full items-center justify-center gap-8 overflow-hidden">
        <Separator
          orientation="horizontal"
          className={`${
            artistSiteData[0].background_color === 'bg-[#DDDDDD]'
              ? 'bg-black/50'
              : 'bg-white/10'
          }`}
        />
        <p className="w-fit text-center font-grtsk-giga text-base font-medium uppercase">
          {title}
        </p>
        <Separator
          orientation="horizontal"
          className={`${
            artistSiteData[0].background_color === 'bg-[#DDDDDD]'
              ? 'bg-black/50'
              : 'bg-white/10'
          }`}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {children}
      </div>
    </div>
  );
}
