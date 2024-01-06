import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSession } from '@/app/supabase-server';

import CustomizeForm from '@/components/forms/CustomizeForm';

export const revalidate = 0;

export default async function Customize() {
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

  const session = await getSession();

  const user_id = session?.user.id;

  let initialFormData;
  let defaultMusicTabValue = 'catalog';

  if (user_id) {
    const { data } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user_id)
      .single();

    initialFormData = data;

    if (data && data.view) {
      if (data.view === 'both') {
        defaultMusicTabValue = 'both';
      } else if (data.view === 'top_tracks') {
        defaultMusicTabValue = 'top_tracks';
      }
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-8 pt-4">
      <CustomizeForm
        session={session}
        defaultMusicTabValue={defaultMusicTabValue}
        initialFormData={initialFormData}
      />
    </main>
  );
}
