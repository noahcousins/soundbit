import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSession } from '@/app/supabase-server';

import CustomizeForm from '@/components/forms/CustomizeForm';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import ArtistPage from '@/components/pages/ArtistCustomPage';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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
  let siteHandle; // Define a variable to hold the 'handle' value

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

    // Assuming 'handle' is a property in initialFormData
    siteHandle = data?.handle; // Get the 'handle' value from initialFormData
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-8 md:flex-row">
      <aside className="flex w-full md:w-1/4 lg:w-1/3">
        <ScrollArea className="block h-full w-full rounded-md p-4">
          <div style={{ height: '100%', width: '100%' }}>
            <CustomizeForm
              session={session}
              defaultMusicTabValue={defaultMusicTabValue}
              initialFormData={initialFormData}
            />
          </div>
        </ScrollArea>
      </aside>
      <Separator className="hidden sm:block" orientation="vertical" />
      <Separator className="block sm:hidden" orientation="horizontal" />

      <div className="flex h-screen w-full md:w-3/4 lg:w-2/3">
        <ScrollArea className="block h-full w-full rounded-md p-4">
          <div style={{ height: '100%', width: '100%' }}>
            <ArtistPage artistSiteData={initialFormData} handle={siteHandle} />
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
