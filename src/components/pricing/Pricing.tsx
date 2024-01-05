'use client';

import { Button } from '@/src/components/ui/button';
import { Database } from '@/types_db';
import { postData } from '@/src/utils/helpers';
import { getStripe } from '@/src/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CheckIcon } from 'lucide-react';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
  metadata: {
    benefits: string; // Define benefits as a string
  } | null;
}

interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({
  session,
  user,
  products,
  subscription
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/signin');
    }
    if (subscription) {
      return router.push('/account');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  console.log(products, 'product');

  products.sort((a, b) => {
    const priceA =
      a.prices.find((price) => price.interval === billingInterval)
        ?.unit_amount || 0;
    const priceB =
      b.prices.find((price) => price.interval === billingInterval)
        ?.unit_amount || 0;
    return priceA - priceB;
  });

  if (!products.length) return <div className=""></div>;

  if (products.length === 1)
    return (
      <section className="bg-black">
        <div className="mx-auto max-w-6xl">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Plans & Pricing
            </h1>
            <p className="m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
              Start sending for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="relative mt-12 flex self-center rounded-lg border border-zinc-800 bg-zinc-900">
              <div className="divide-y divide-zinc-600 rounded-lg border border-pink-500 border-opacity-50 bg-zinc-900 shadow-sm">
                <div className="m-1 whitespace-nowrap rounded-md border-zinc-800 p-6 py-2 text-2xl font-medium text-white shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 sm:w-auto sm:px-8">
                  {products[0].name}
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
              {products[0].prices?.map((price) => {
                const priceString =
                  price.unit_amount &&
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency!,
                    minimumFractionDigits: 0
                  }).format(price.unit_amount / 100);

                return (
                  <div
                    key={price.interval}
                    className="divide-y divide-zinc-600 rounded-2xl bg-zinc-900 shadow-sm"
                  >
                    <div className="p-6">
                      <p>
                        <span className="white text-5xl font-extrabold">
                          {priceString}
                        </span>
                        <span className="text-base font-medium text-zinc-100">
                          /{price.interval}
                        </span>
                      </p>
                      <p className="mt-4 text-zinc-300">{price.description}</p>
                      <Button
                        variant="default"
                        type="button"
                        disabled={false}
                        onClick={() => handleCheckout(price)}
                        className="mt-12 block w-full rounded-md py-2 text-center text-sm font-semibold text-black"
                      >
                        {products[0].name ===
                        subscription?.prices?.products?.name
                          ? 'Manage'
                          : 'Subscribe'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Plans & Pricing
          </h1>
          <p className="m-auto mt-5 max-w-xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Start sending for free, then add a plan to ramp it up. Account plans
            unlock additional features.
          </p>
          <div className="relative mt-6 flex self-center rounded-lg border border-zinc-800 bg-zinc-900 p-0.5 sm:mt-8">
            {intervals.includes('month') && (
              <button
                onClick={() => setBillingInterval('month')}
                type="button"
                className={`${
                  billingInterval === 'month'
                    ? 'relative w-1/2 border-zinc-800 bg-zinc-700 text-white shadow-sm'
                    : 'relative ml-0.5 w-1/2 border border-transparent text-zinc-400'
                } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes('year') && (
              <button
                onClick={() => setBillingInterval('year')}
                type="button"
                className={`${
                  billingInterval === 'year'
                    ? 'relative w-1/2 border-zinc-800 bg-zinc-700 text-white shadow-sm'
                    : 'relative ml-0.5 w-1/2 border border-transparent text-zinc-400'
                } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);

            const benefits = product.metadata?.benefits
              ? JSON.parse(product.metadata.benefits)
              : [];

            return (
              <div
                key={product.id}
                className={cn(
                  'divide-y divide-zinc-600 rounded-2xl bg-zinc-900 shadow-sm',
                  {
                    'border border-purple-700': subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === 'Basic Plan'
                  }
                )}
              >
                <div className="flex flex-col gap-4 p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {product.name}
                  </h2>
                  <p className="text-sm text-zinc-300">{product.description}</p>
                  <p className="">
                    <span className="white text-5xl font-extrabold">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-zinc-100">
                      /{billingInterval}
                    </span>
                  </p>
                  {benefits.length > 0 && (
                    <ul className="mt-2 flex flex-col gap-2 text-zinc-300">
                      {benefits.map((benefit: any, index: number) => (
                        <li
                          className="flex items-center gap-2 text-sm"
                          key={index}
                        >
                          <CheckIcon />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    variant="default"
                    type="button"
                    disabled={!session}
                    onClick={() => handleCheckout(price)}
                    className="block w-full rounded-md py-2 text-center text-sm font-semibold text-background hover:bg-zinc-900 hover:text-white"
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
