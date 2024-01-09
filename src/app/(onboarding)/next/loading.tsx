import { Skeleton } from '@/components/ui/skeleton';

export default function NextLoading() {
  return (
    <div className="space-y-8 text-center">
      <Skeleton className="mx-auto h-12 max-w-sm text-center font-grtsk-giga text-2xl font-bold" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item, index) => {
          return (
            <Skeleton
              key={index}
              className={`flex items-center space-x-3 space-y-0 `}
            >
              <div
                className={`flex cursor-pointer flex-col gap-4 rounded-lg bg-primary/5 p-4 shadow-lg`}
              >
                <div
                  className="z-50 aspect-square h-[200px] w-[200px] rounded-full"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: '200px'
                  }}
                >
                  <Skeleton className="h-full w-full" />
                </div>

                <Skeleton className="line-clamp-1 h-8 text-center text-lg font-semibold" />
              </div>
            </Skeleton>
          );
        })}
      </div>

      <Skeleton className="mx-auto h-12 w-32 text-center text-lg font-semibold" />
    </div>
  );
}
