'use client';

import { Button } from '@/components/ui/button';
import { Database } from '../../../types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { CSSProperties, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CheckCircle2, CheckIcon, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PricingTabs from '@/components/pricing/PricingTabs';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
  metadata: {
    benefits: string;
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
  console.log(session, user, products, subscription, 'Stripe data here');

  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );

  console.log(intervals, 'inin');
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/log-in');
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

  const plans = [
    {
      title: 'Pro',
      monthlyPrice: 5,
      yearlyPrice: 50,
      description: 'Perfect for owners of small & medium businessess',
      features: [
        'More customization (themes, colors)',
        'Remove soundbit. branding',
        'Custom domain (coming soon)'
      ],
      actionLabel: 'Get Started',
      popular: true
    }
  ];

  let description: 'Perfect for owners of small & medium businessess';
  let features: [
    'More customization (themes, colors)',
    'Remove soundbit. branding',
    'Custom domain (coming soon)'
  ];

  return (
    <section className="bg-gradient-to-b from-transparent to-black  px-4 lg:px-0">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 py-8">
        <div className="align-center flex flex-col gap-2">
          <h3 className="text-center font-grtsk-giga text-4xl font-extrabold text-white sm:text-6xl">
            Go PRO
          </h3>
          <p className="m-auto max-w-xl text-center text-lg text-zinc-200">
            For artists needing the
            <span className="px-1 font-grtsk-giga font-bold">ultimate</span>
            website.
          </p>
        </div>
        <PricingTabs
          activeTab={billingInterval}
          setActiveTab={setBillingInterval}
          tabs={[
            { id: 'month', label: 'Monthly' },
            { id: 'year', label: 'Yearly' }
          ]}
        />
        {products.slice(0, 2).map((product) => {
          const price = product?.prices?.find(
            (price) => price.interval === billingInterval
          );
          if (!price) return null;
          const priceString = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: price.currency!,
            minimumFractionDigits: 0
          }).format((price?.unit_amount || 0) / 100);

          console.log(price, priceString, 'pririri');

          const benefits = product.metadata?.benefits
            ? JSON.parse(product.metadata.benefits)
            : [];

          return (
            <Card
              className={cn(
                `relative z-10 mx-auto flex w-full flex-col justify-between gap-8 rounded-3xl p-12 sm:mx-0 sm:w-80`
              )}
            >
              <div
                style={{
                  background:
                    'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%, rgb(0, 0, 0) 100%)'
                }}
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              />
              <div
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)'
                }}
                className="user-select-none center pointer-events-none absolute left-1/2 top-0 z-20 h-px w-72 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-b-3xl"
              />
              <div className="z-30 flex flex-col gap-8">
                <CardHeader className="p-0">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg text-white">
                      <span className="font-grtsk-giga">soundbit. PRO</span>
                    </CardTitle>
                  </div>
                  {priceString && billingInterval ? (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex gap-0.5">
                        <h3 className="font-grtsk-giga text-3xl font-bold">
                          {priceString}
                        </h3>
                        <span className="mb-1 flex flex-col justify-end text-sm">
                          {'/'}
                          {billingInterval}
                        </span>
                      </div>{' '}
                      {billingInterval === 'year' ? (
                        <div
                          className={cn(
                            'h-fit w-fit rounded-xl bg-[#FF2E01]/20 px-2 py-1 text-xs text-white dark:text-white',
                            {
                              'border-[1px] border-[#FF2E01] dark:text-[#FF2E01] ':
                                billingInterval
                            }
                          )}
                        >
                          Save $10
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                  <CardDescription className="h-12 pt-1.5 font-light">
                    Perfect for artists who need a custom website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 p-0">
                  <CheckItem text={'More customization (themes, colors)'} />
                  <CheckItem text={'Remove soundbit. branding'} />
                  <CheckItem text={'Custom domain (coming soon)'} />
                </CardContent>
                <CardFooter className="p-0">
                  {intervals.includes('month') && (
                    <div className="flex w-full items-center">
                      <Button
                        type="button"
                        onClick={() => handleCheckout(price)}
                        className="relative mx-auto inline-flex w-full items-center justify-center rounded-md bg-white px-6 font-medium text-black transition-colors focus:outline-none focus:ring-0"
                      >
                        Get Started
                      </Button>
                      {/* <Button
                        type="button"
                        onClick={() => handleCheckout(price)}
                        style={
                          {
                            '--background': '0 0 0',
                            '--highlight': '255 255 255',

                            '--bg-color':
                              'linear-gradient(rgb(var(--background)), rgb(var(--background)))',
                            '--border-color': `linear-gradient(145deg,
                              rgb(var(--highlight)) 0%,
                              rgb(var(--highlight) / 0.3) 33.33%,
                              rgb(var(--highlight) / 0.14) 66.67%,
                              rgb(var(--highlight) / 0.1) 100%)
                            `
                          } as CSSProperties
                        }
                        className="focus:outline-nonefocus:ring-0 relative inline-flex w-full items-center
                        justify-center rounded-md border border-transparent bg-black text-center font-medium text-white transition-colors [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
                      >
                        Get Started
                      </Button> */}
                    </div>
                  )}
                </CardFooter>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <CheckCircle2 size={18} className="my-auto text-[#FF2E01]" />
    <p className="text-xs text-white/80">{text}</p>
  </div>
);
