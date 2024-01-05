import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/src/app/supabase-server';

import Hero from '@/src/components/sections/Hero';
import FeatureGrid from '@/src/components/sections/FeatureGrid';
import Pricing from '@/src/components/pricing/Pricing';

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
    <div className={'flex w-full flex-col'}>
      <Hero profileData={profileData} />
      <FeatureGrid />
      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </div>
  );
}
