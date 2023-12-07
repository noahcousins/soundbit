//@ts-nocheck

import type { Database } from '@/lib/database.types';
import { createBrowserClient } from '@supabase/ssr';
import { fetchCounts } from '@/utils/supabase/api/legacy/api';

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Politicians main page
export async function fetchPoliticiansPageWithCounts() {
  const politiciansData = await supabase
    .from('politicians')
    .select('id,handle,pictureUrl,state,party,position,name');

  const politiciansWithCounts = await Promise.all(
    politiciansData.data!.map(async (politician) => {
      try {
        const counts = await fetchCounts(politician);

        console.log(politician, 'poliiii');
        return { ...politician, ...counts };
      } catch (error) {
        // Handle the error or continue with default counts if an error occurs.
        console.error(
          `Error fetching counts for politician ${politician.id}:`,
          error
        );
        return { ...politician, legislationCount: 0, statementCount: 3 };
      }
    })
  );

  return politiciansWithCounts;
}

// Politician profile page
export async function fetchPoliticianDetails(handle: string) {
  const { data: politicians, error: politiciansError } = await supabase
    .from('politicians')
    .select(
      'biography,name,pictureUrl,position,party,state,yearIn,yearOut,twitter,facebook,officialWebsite,id'
    )
    .eq('handle', handle);

  if (politiciansError) {
    console.log('Error: ', politiciansError);
    return null;
  }

  return politicians[0];
}

export async function fetchPoliticianStatements(politicianId: string) {
  const { data: statementsData, error: statementsError } = await supabase
    .from('statements')
    .select('id,date,subject,handle,quote')
    .limit(8)
    .eq('politicianId', politicianId)
    .order('date', { ascending: false });

  if (statementsError) {
    console.log('Error fetching statements: ', statementsError);
    return [];
  }

  return statementsData;
}

export async function fetchPoliticianLegislations(politicianId: string) {
  const { data: legislationsData, error: legislationsError } = await supabase
    .from('legislations')
    .select('id,title,bill,handle,date')
    .limit(6)
    .contains('politicianTags', [politicianId])
    .order('date', { ascending: false });

  if (legislationsError) {
    console.log('Error fetching legislations: ', legislationsError);
    return [];
  }

  return legislationsData;
}

export async function fetchPoliticianEvents(politicianId: string) {
  const { data: eventsData, error: eventsError } = await supabase
    .from('events')
    .select('handle,title,location,date')
    .contains('politicianTags', [politicianId])
    .limit(3);

  if (eventsError) {
    console.log('Error fetching events: ', eventsError);
    return [];
  }

  return eventsData;
}

export async function fetchSimilarPoliticians(politicianId: string) {
  const { data: similarPoliticiansData, error: similarPoliticiansError } =
    await supabase
      .from('politicians')
      .select('id,handle,pictureUrl,name,position,party,state')
      .limit(8)
      .neq('id', politicianId);

  if (similarPoliticiansError) {
    console.log('Error: ', similarPoliticiansError);
    return [];
  }

  return similarPoliticiansData;
}
