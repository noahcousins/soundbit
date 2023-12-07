import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import Pricing from '@/components/Pricing';
import { Badge } from '@/components/ui/badge';
import {
  Library,
  Box,
  File,
  Paintbrush,
  Users,
  User,
  ChevronRight
} from 'lucide-react';

import {
  Megaphone,
  Users2,
  ScrollText,
  Compass,
  Mic,
  Blocks,
  Gavel,
  Info
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import MultiLayerParallax from '@/components/sections/hero/MultiLayerParallax';
import GridSection from '@/components/sections/GridSection';

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
      <MultiLayerParallax />

      <div
        className={
          'mx-auto flex w-full max-w-5xl justify-center py-12 animate-in fade-in ' +
          ' delay-300 duration-1000 slide-in-from-top-16 fill-mode-both'
        }
      >
        <Image
          priority
          className={
            'rounded-2xl shadow-[0_0_1000px_0]' +
            ' shadow-purple-600/40 animate-in fade-in' +
            ' delay-300 duration-1000 ease-out zoom-in-50 fill-mode-both'
          }
          width={2688}
          height={1824}
          src={`/explore-dark.jpg`}
          alt={`App Image`}
        />
      </div>

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
