import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSession } from '@/app/supabase-server';

import CustomizeForm from '@/components/forms/CustomizeForm';

import {
  searchArtistAlbums,
  searchArtistById,
  searchArtistTopTracks
} from '@/lib/spotify';

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

  let artistName = 'Unknown';
  let artistId = 'Unknown';
  let artistBio = 'Unknown';
  let userId = 'Unknown';
  let market = 'Unknown';

  if (initialFormData) {
    artistName = initialFormData.artist_name;
    artistId = initialFormData.artist_id;
    artistBio = initialFormData.artist_bio;
    userId = initialFormData.user_id;
    market = 'US';
  }

  const artistDetails = await searchArtistById(artistId);

  const artistSpotifyData = await artistDetails.json();

  const albumFilters = {
    includeGroups: 'album',
    market: 'US',
    limit: 50,
    offset: 0
  };

  const singleFilters = {
    includeGroups: 'single',
    market: 'US',
    limit: 50,
    offset: 0
  };

  let artistAlbumsData, artistSinglesData, artistTopTracksData;

  // Conditional checks based on the 'view' value
  if (initialFormData) {
    const view = initialFormData.view;

    if (view === 'top_tracks' || view === 'both') {
      const artistTopTracks = await searchArtistTopTracks({ artistId, market });
      artistTopTracksData = await artistTopTracks.json();
    }

    if (view === 'catalog' || view === 'both') {
      const artistAlbums = await searchArtistAlbums({
        artistId,
        ...albumFilters
      });
      const artistSingles = await searchArtistAlbums({
        artistId,
        ...singleFilters
      });

      artistAlbumsData = await artistAlbums.json();
      artistSinglesData = await artistSingles.json();
    }
  } else {
    <div>Artist data not available</div>; // Replace this with your desired UI/message
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-8 md:flex-row">
      <aside className="flex w-full md:w-1/4 lg:w-1/3">
        <ScrollArea className="block h-full w-full rounded-md p-4">
          <div style={{ height: '100%', width: '100%' }}>
            <CustomizeForm
              artistTopTracksData={artistTopTracksData}
              artistAlbumsData={artistAlbumsData}
              artistSinglesData={artistSinglesData}
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
            <ArtistPage
              artistSpotifyData={artistSpotifyData}
              artistSiteData={initialFormData}
              handle={siteHandle}
            />
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
