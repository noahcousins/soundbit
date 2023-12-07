import Image from 'next/image';
import Link from 'next/link';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import {
  fetchPoliticiansOutreach,
  fetchTemplates
} from '@/utils/supabase/api/legacy/api';
import OutreachForm from '@/components/outreach/OutreachForm';

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

      <OutreachForm
        politiciansData={politiciansData}
        session={session}
        templates={templates}
      />
    </main>
  );
}
