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
import Image from 'next/image';

import MultiLayerParallax from '@/components/sections/hero/MultiLayerParallax';

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
    <div className={'flex w-full flex-col space-y-16'}>
      {/* <div
        className={
          'my-12 flex w-full flex-col items-center lg:my-16' +
          ' mx-auto justify-center animate-in fade-in ' +
          ' duration-1000 slide-in-from-top-12'
        }
      >
        <div className="flex w-full flex-1 flex-col space-y-8 text-center">
          <Badge className="mx-auto w-fit" variant="outline">
            The leading UAP congressional outreach platform
          </Badge>
          <div className="mx-auto flex w-full flex-col">
            {' '}
            <h1 className="mx-auto flex scroll-m-20 items-center text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
              Propelling{' '}
              <span
                className={
                  'bg-gradient-to-r bg-clip-text pl-2 text-transparent' +
                  ' from-blue-500 via-purple-700 to-red-500 leading-[1.2]'
                }
              >
                {' '}
                bipartisan
              </span>
            </h1>
            <h1 className="mx-auto flex  scroll-m-20 flex-col text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
              UAP disclosure efforts.
            </h1>
          </div>

          <p className="flex flex-col gap-1 text-center">
            <span>Track the political climate around UAP.</span>
            <span>One-click send to your politicians.</span>
            <span>Be a voice in disclosure.</span>
          </p>

          <div className={'flex flex-col items-center space-y-4'}>
            <span className={'text-xs text-gray-500 dark:text-gray-400'}>
              Free plan. No credit card required.
            </span>
          </div>
        </div>
      </div> */}
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
            ' shadow-purple-700/40 animate-in fade-in' +
            ' delay-300 duration-1000 ease-out zoom-in-50 fill-mode-both'
          }
          width={2688}
          height={1824}
          src={`/explore-dark.jpg`}
          alt={`App Image`}
        />
      </div>

      <div
        className={'flex flex-col items-center justify-center space-y-24 py-16'}
      >
        <div
          className={
            'flex max-w-3xl flex-col items-center space-y-8 text-center'
          }
        >
          <div className={'flex flex-col space-y-2.5'}></div>
        </div>

        <div>
          <div className={'grid gap-12 lg:grid-cols-3'}>
            <div className={'flex flex-col space-y-2'}>
              <User className={'h-5'} />

              <div className={'text-sm text-gray-500 dark:text-gray-400'}>
                Secure and Easy-to-Use Authentication for Your SaaS Website
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Library className={'h-5'} />

              <div className={'text-sm text-gray-500 dark:text-gray-400'}>
                Powerful Multi-Tenancy Features for Maximum Flexibility and
                Efficiency
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Users className={'h-5'} />

              <div className={'text-sm text-gray-500 dark:text-gray-400'}>
                Effortlessly Manage and Organize Your Team Members
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Paintbrush className={'h-5'} />

              <div className={'text-sm text-gray-500 dark:text-gray-400'}>
                Customizable UI Themes to Match Your Brand and Style
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Box className={'h-5'} />

              <div className={'text-sm text-gray-500 dark:text-gray-400'}>
                Pre-built UI Components to Speed Up Your Development
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <File className={'h-5'} />

              <div className={'text-sm text-gray-500 dark:text-gray-400'}>
                Pre-built Blog and Documentation Pages to Help Your Users
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-4'}></div>

        <div>
          Our authentication system is built on top of the industry-leading PaaS
          such as Supabase and Firebase. It is secure, easy-to-use, and fully
          customizable. It supports email/password, social logins, and more.
        </div>

        <div></div>

        <Image
          className="rounded-2xl"
          src={'/assets/images/sign-in.webp'}
          width={'626'}
          height={'683'}
          alt={'Sign In'}
        />

        <Image
          className="rounded-2xl"
          src={'/assets/images/dashboard.webp'}
          width={'887'}
          height={'743'}
          alt={'Dashboard'}
        />

        <div className={'flex flex-col space-y-4'}>
          <div>
            Our dashboard offers an overview of your SaaS business. It shows at
            a glance all you need to know about your business. It is fully
            customizable and extendable.
          </div>

          <div>
            <span className={'flex items-center space-x-2'}>
              <span>Get Started</span>
              <ChevronRight className={'h-3'} />
            </span>
          </div>
        </div>
      </div>

      <div
        className={'flex flex-col items-center justify-center space-y-16 py-16'}
      >
        <div className={'flex flex-col items-center space-y-8 text-center'}>
          <div className={'flex flex-col space-y-2.5'}></div>
        </div>
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
