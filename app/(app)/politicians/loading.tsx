import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPoliticians() {
  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-8">
      <div className="flex w-full flex-col content-between justify-between gap-8 md:flex-row">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-9 w-52 rounded-full" />
          <Skeleton className="h-6 w-[183px] rounded-full" />
        </div>
        <div className="my-auto flex h-fit">
          <AnimatedTabs />
        </div>
        <div className="my-auto">
          <YearRangeSlider />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 justify-between gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 18 }).map((_, index) => (
          <div
            key={index}
            className="border-scale-500 hover:border-scale-700 dark:bg-scale-300 group relative flex w-full cursor-pointer justify-between overflow-hidden rounded-2xl border-[1px] border-white border-opacity-10 text-left transition-all duration-100 hover:border-opacity-50"
          >
            <Skeleton className="absolute z-10 w-full opacity-5" />
            <div className="z-20 m-4 flex w-full flex-col justify-between">
              <div className="my-auto flex h-full items-center justify-between gap-4">
                {/* Politician's picture */}
                <Skeleton className="aspect-square h-[89px] w-[89px] rounded-full" />

                <div className="flex h-fit w-full items-center justify-between gap-4">
                  <div className="flex w-fit flex-col gap-2">
                    {/* Politician's position, name, party, and state */}
                    <div className="flex justify-between gap-2">
                      <Skeleton className="h-[20px] w-[33px] rounded-full" />
                      <Skeleton className="h-[20px] w-[33px] rounded-full" />
                    </div>

                    <Skeleton className="h-[28px] w-[126px] rounded-full" />
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Total statements and legislation */}
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function AnimatedTabs() {
  return (
    <div className="flex space-x-1">
      <Skeleton className="h-[32px] w-[90px] rounded-full" />
      <Skeleton className="h-[32px] w-[40px] rounded-full" />
      <Skeleton className="h-[32px] w-[98px] rounded-full" />
    </div>
  );
}

function YearRangeSlider() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[20px] w-[100px] rounded-full" />
      <Skeleton className="h-[20px] w-[79px] rounded-full" />
    </div>
  );
}
