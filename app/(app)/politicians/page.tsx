import PoliticiansGrid from '@/components/politicians/PoliticiansGrid';
import { fetchPoliticiansAndCounts2 } from '@/utils/supabase/api';

export const revalidate = 0;

export default async function Politicians() {
  const politiciansWithCounts = await fetchPoliticiansAndCounts2();

  // console.log(politiciansWithCounts, 'weee');

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-4">
      <div className="flex w-full flex-col content-between justify-between">
        <h1 className="text-4xl font-bold">Politicians</h1>
        <p className="text-lg">Browse by politician.</p>
      </div>
      <PoliticiansGrid politiciansWithCounts={politiciansWithCounts} />
    </main>
  );
}
