import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function PoliticiansPreview({
  politicians
}: {
  politicians: any;
}) {
  // Calculate the count of politicians exceeding 3
  const additionalPoliticiansCount = Math.max(0, politicians?.length - 3);

  return (
    <div className={`flex w-full -space-x-4`}>
      {/* Display up to 3 politician images */}
      {politicians?.slice(0, 3).map((politician: any, index: any) => (
        <Link key={index} href={`/politicians/${politician.handle}`}>
          <img
            className={`h-10 w-10 rounded-full border-2 border-primary/60 transition duration-200 ease-in-out hover:border-primary/100`}
            src={politician?.pictureUrl}
            alt={`Photo of ${politician?.name}`}
          />
        </Link>
      ))}

      {/* Show "+ x others" if there are more than 3 politicians */}
      {additionalPoliticiansCount > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/60 border-white bg-neutral-700 text-xs font-medium text-white transition duration-100 ease-in-out hover:border-primary/100 hover:bg-neutral-600">
          +{additionalPoliticiansCount}
        </div>
      )}
    </div>
  );
}
