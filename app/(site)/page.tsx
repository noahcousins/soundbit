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

export default async function Home() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <div className={'flex flex-col w-full space-y-16'}>
      <div
        className={
          'my-12 w-full flex flex-col items-center lg:my-16' +
          ' mx-auto justify-center animate-in fade-in ' +
          ' duration-1000 slide-in-from-top-12'
        }
      >
        <div className="flex w-full">
          <div className={'flex w-1/2 flex-1 flex-col space-y-8'}>
            <Badge className="w-fit" variant="outline">
              The leading UAP congressional outreach platform
            </Badge>
            <h1 className="scroll-m-20 flex flex-col text-4xl font-extrabold tracking-tight lg:text-5xl">
              <span className="flex">
                Propelling
                <span
                  className={
                    'bg-gradient-to-r bg-clip-text text-transparent' +
                    ' from-red-400 to-blue-700 leading-[1.2]'
                  }
                >
                  {' '}
                  bipartisan
                </span>
              </span>
              UAP disclosure efforts.
              {/* </span> */}
            </h1>
            <p className="flex flex-col text-center gap-1">
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
          <div className="flex w-1/2"></div>
        </div>
      </div>

      <div
        className={
          'flex justify-center w-full py-12 max-w-5xl mx-auto animate-in fade-in ' +
          ' duration-1000 slide-in-from-top-16 fill-mode-both delay-300'
        }
      >
        <Image
          priority
          className={
            'shadow-[0_0_1000px_0] rounded-2xl' +
            ' shadow-accent/40 animate-in fade-in' +
            ' zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both'
          }
          width={2688}
          height={1824}
          src={`/assets/images/dashbŽard-dark.webp`}
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

              <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                Secure and Easy-to-Use Authentication for Your SaaS Website
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Library className={'h-5'} />

              <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                Powerful Multi-Tenancy Features for Maximum Flexibility and
                Efficiency
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Users className={'h-5'} />

              <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                Effortlessly Manage and Organize Your Team Members
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Paintbrush className={'h-5'} />

              <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                Customizable UI Themes to Match Your Brand and Style
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Box className={'h-5'} />

              <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
                Pre-built UI Components to Speed Up Your Development
              </div>
            </div>

            <div className={'flex flex-col space-y-2'}>
              <File className={'h-5'} />

              <div className={'text-gray-500 dark:text-gray-400 text-sm'}>
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
            <span className={'flex space-x-2 items-center'}>
              <span>Get Started</span>
              <ChevronRight className={'h-3'} />
            </span>
          </div>
        </div>
      </div>

      <div
        className={'flex flex-col items-center justify-center py-16 space-y-16'}
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
