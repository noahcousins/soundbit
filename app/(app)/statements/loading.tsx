import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingStatements() {
  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-8">
      <div className="flex w-full flex-col content-between justify-between gap-8">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-[40px] w-[204px] rounded-full" />
          <Skeleton className="h-6 w-[284px] rounded-full" />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 18 }).map((_, index) => (
          <div
            key={index}
            className="relative flex h-[200px] w-[350px] flex-col rounded-2xl border-[1px] border-white border-opacity-10"
          >
            <Skeleton className="absolute z-10 h-full w-full opacity-5" />
            <div className="z-20 my-auto flex w-full flex-col content-between justify-between gap-4 p-8">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-[28px] w-[126px] rounded-full" />
              <Skeleton className="h-[20px] w-[33px] rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
