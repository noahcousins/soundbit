import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import Pricing from '@/components/Pricing';
import { Badge } from '@/components/ui/badge';
import { revalidatePath } from 'next/cache';

import GridSection from '@/components/sections/GridSection';

import ArtistSection from '@/components/artists/ArtistSection';
import { searchSpotifyByArtist } from '@/lib/spotify';

export const metadata = {
  title: 'UAPoli',
  description:
    'A bipartisan congressional outreach platform advocating for UAP disclosure.'
};

export default async function Home() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <div className={'flex w-full flex-col space-y-16 px-4 xl:px-0'}>
      <GridSection />

      <div className={'flex flex-col items-center justify-center py-16'}>
        <Pricing
          session={session}
          user={session?.user}
          products={products}
          subscription={subscription}
        />
      </div>
    </div>
  );
}
