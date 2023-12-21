import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSession } from '@/app/supabase-server';
import { Session } from '@supabase/supabase-js';
import {
  searchArtistAlbums,
  searchArtistById,
  searchArtistTopTracks
} from '@/lib/spotify';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import TestButton from '@/components/artists/TestButton';
import TopTrackCard from '@/components/tracks/TopTrackCard';
import ArtistDetails from '@/components/artists/ArtistDetails';
import AlbumCard from '@/components/tracks/AlbumCard';
import SingleCard from '@/components/tracks/SingleCard';
import CardGrid from '@/components/artists/CardGrid';
import AccountForm from '@/components/forms/AccountForm';

import LinksForm from '@/components/forms/LinksForm';
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
  let defaultMusicTabValue = 'catalog'; // Default tab value

  if (user_id) {
    const { data } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user_id)
      .single();

    initialFormData = data; // Assign the data to initialFormData

    // Check the 'view' value and set the default tab accordingly
    if (data && data.view) {
      if (data.view === 'both') {
        defaultMusicTabValue = 'both';
      } else if (data.view === 'top_tracks') {
        defaultMusicTabValue = 'top_tracks';
      }
      // Add other conditions if needed
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
