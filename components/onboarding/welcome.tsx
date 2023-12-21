import ArtistInput from '@/components/artists/ArtistInput';
import ArtistSelector from '@/components/artists/ArtistSelector';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { searchSpotifyByArtist } from '@/lib/spotify';
import { getSession } from '@/app/supabase-server';
import { Session } from '@supabase/supabase-js';
import HandleInput from '@/components/artists/HandleInput';
import { redirect } from 'next/navigation';

export default async function Welcome() {
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

  const addArtistName = async (formData: FormData, session: Session) => {
    'use server';

    const artist_name = formData.get('name') as string;

    if (artist_name) {
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
      const user = session?.user;
      const { error } = await supabase.from('sites').upsert(
        { artist_name: artist_name, user_id: session?.user.id },
        { onConflict: 'user_id' } // Specify the conflict target
      );

      if (error) {
        console.error('Error adding artist name:', error);
      } else {
        console.log('Artist name added');
        redirect('/next');
      }
    }
  };

  const user = session?.user;

  const { data, error } = await supabase
    .from('sites')
    .select('artist_name')
    .eq('user_id', user?.id!);

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  const artistNameData = data;

  if (!artistNameData || artistNameData.length === 0) {
    console.log('Error: No artist name found for the user.');
    return (
      <div className="">
        <h1>What is your artist name?</h1>
        <ArtistInput onSubmit={addArtistName} />
      </div>
    );
  }

  const userArtistName = artistNameData[0].artist_name;

  const artistList = await searchSpotifyByArtist(userArtistName, 3, 0);
  const nameData = await artistList.json();

  return (
    <div className="">
      <h1>What is your artist name?</h1>
      <ArtistInput onSubmit={addArtistName} />
    </div>
  );
}
