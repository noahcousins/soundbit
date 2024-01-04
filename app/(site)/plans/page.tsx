import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import Pricing from '@/components/Pricing';

export default async function Plans() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <div
      className={'mx-auto flex flex-col items-center justify-center space-y-16'}
    >
      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </div>
  );
}
