import { Skeleton } from '@/components/ui/skeleton';

export default function WelcomeLoading({ onSubmit }: { onSubmit: Function }) {
  return (
    <div className="flex w-full flex-col gap-8">
      <Skeleton className="mx-auto h-20 w-[448px] px-8" />

      <Skeleton className="mx-auto h-10 w-72" />

      <Skeleton className="mx-auto h-12 w-24 text-center text-lg font-semibold" />
    </div>
  );
}
