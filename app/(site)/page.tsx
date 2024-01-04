import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import Pricing from '@/components/Pricing';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import GridSection from '@/components/sections/GridSection';

import Hero from '@/components/sections/Hero';
import FeatureGrid from '@/components/sections/FeatureGrid';

export default async function Home() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  let profileData = null;

  if (user) {
    const profileQuery = await supabase
      .from('sites')
      .select('handle')
      .eq('user_id', user.id)
      .single();

    profileData = profileQuery.data;
  }

  return (
    <div className={'flex w-full flex-col gap-8 px-4 xl:px-0'}>
      <Hero profileData={profileData} />
      <FeatureGrid />
    </div>
  );
}
