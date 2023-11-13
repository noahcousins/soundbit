//@ts-nocheck

import type { Database } from '@/lib/database.types';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function fetchPoliticiansAndCounts() {
  const politiciansData = await supabase
    .from('politicians')
    .select('handle,pictureUrl,state,party,position,name');
  const politiciansWithCounts = await Promise.all(
    politiciansData.data!.map(async (politician) => {
      const counts = await fetchCounts(politician.id);
      return { ...politician, ...counts };
    })
  );

  return politiciansWithCounts;
}
