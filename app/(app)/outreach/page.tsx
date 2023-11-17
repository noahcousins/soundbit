import Image from 'next/image';
import Link from 'next/link';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { fetchPoliticiansOutreach, fetchTemplates } from '@/utils/supabase/api';

import TemplateForm from '@/components/forms/TemplateForm';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';

export const revalidate = 0;

export default async function Outreach() {
  const politiciansData = await fetchPoliticiansOutreach();
  const templates = await fetchTemplates();

  console.log(politiciansData, '111');

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
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen w-full flex-col items-start">
      <div className="flex w-full flex-col content-between justify-between gap-8">
        <div className="flex w-full flex-col content-between justify-between">
          <h1 className="text-4xl font-bold">Outreach</h1>
          <p className="text-lg">Reach out to your elected officials.</p>
        </div>
      </div>

      {politiciansData.data!.map((politician) => {
        const formattedName = formatName(
          politician.position!,
          politician.name!
        );

        return (
          <Accordion
            className="mx-auto w-full"
            type="single"
            collapsible
            key={politician.id}
          >
            <AccordionItem
              className="items-start text-left"
              value={`item-${politician.id}`}
            >
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  <Image
                    width={100}
                    height={100}
                    src={politician?.pictureUrl!}
                    alt={`Photo of ${politician?.name}`}
                    className={
                      'aspect-square h-12 w-12 rounded-full object-cover'
                    }
                  />
                  <div className="flex flex-col">
                    <p className="">{formattedName}</p>
                    <p className="text-left text-xs uppercase">
                      {politician.state}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-2">
                  <Link
                    href={`tel:${politician.phone_number}`}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <div className="flex flex-col items-center">
                      <p className="">Call now</p>
                      <p className="text-xs uppercase">
                        {politician.phone_number}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={politician.officialWebsite!}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <div className="flex flex-col items-center">
                      <p className="">Email</p>
                    </div>
                  </Link>
                  <p className="">or</p>
                  <Link
                    href={politician.officialWebsite!}
                    className={buttonVariants({ variant: 'default' })}
                  >
                    <div className="flex flex-col items-center">
                      <p className="">One-click send with UAPoli</p>
                    </div>
                  </Link>
                </div>
                <TemplateForm
                  politician={politician}
                  session={session}
                  templates={templates}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </main>
  );
}

function formatName(position: string, name: string) {
  if (position === 'Senator') {
    return 'Sen. ' + name;
  } else if (position === 'Representative') {
    return 'Rep. ' + name;
  } else {
    return position + ' ' + name;
  }
}
