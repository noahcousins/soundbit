import Image from "next/image";

export default function PoliticianBlip({
  politician,
  isSmall,
}: {
  politician: any;
  isSmall: boolean;
}) {
  const politicianName = `${
    politician?.position === "Senator" ? "Sen." : "Rep."
  } ${politician?.name}`;

  return (
    <div className={isSmall ? "flex w-fit items-center gap-4" : "w-fit"}>
      <a
        href={`/politicians/${politician?.handle}`}
        className="aspect-square h-12 w-12"
      >
        <Image
          width={isSmall ? 100 : 450}
          height={isSmall ? 100 : 450}
          src={politician?.pictureUrl}
          alt={`Photo of ${politician?.name}`}
          className={
            isSmall
              ? "aspect-square h-12 w-12 rounded-full object-cover"
              : "aspect-square h-12 w-12 rounded-full object-cover"
          }
        />
      </a>

      {!isSmall && (
        <div className="flex items-center">
          <a href={`/politicians/${politician?.handle}`} className="">
            <cite className="text-scale-1100 whitespace-nowrap font-medium not-italic">
              {politicianName}
            </cite>
          </a>
        </div>
      )}

      {isSmall && (
        <div className="flex flex-col items-start">
          <cite className="text-scale-1100 whitespace-nowrap font-medium not-italic">
            {politicianName}
          </cite>
          <p className="text-xs text-primary/60">
            {politician.party} from {politician.state}
          </p>
        </div>
      )}
    </div>
  );
}
