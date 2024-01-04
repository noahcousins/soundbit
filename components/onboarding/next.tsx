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

export const revalidate = 0;

export default async function Next() {
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

  const { data, error } = await supabase
    .from('sites')
    .select('artist_name')
    .eq('user_id', user?.id!);

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  const artistNameData = data;

  const userArtistName = artistNameData[0].artist_name;

  const artistList = await searchSpotifyByArtist(userArtistName, 3, 0);
  const nameData = await artistList.json();

  const artists = nameData?.artists?.items.map(
    (artist: { name: any; images: { url: any }[]; id: any }) => ({
      name: artist.name,
      imageUrl: artist.images[0]?.url,
      id: artist.id
    })
  );
  const names = nameData?.artists?.items?.map((item: any) => item.name);

  const addArtistId = async (formData: FormData, session: Session) => {
    'use server';

    const artistId = formData.get('id') as string;

    if (artistId) {
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
      const { error } = await supabase
        .from('sites')
        .upsert(
          { artist_id: artistId, user_id: session?.user.id },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error adding artist id:', error);
      } else {
        console.log('Artist id added');
        redirect('/handle');
      }
    }
  };

  if (!artists) {
    // If artists data is not available yet, return null or a loading indicator
    return <div>Loading...</div>; // You can use a loading indicator or message
  }

  return (
    <div className="">
      {/* <h1>Select your Spotify profile</h1> */}
      <ArtistSelector
        session={session}
        onSubmit={addArtistId}
        artistNameData={artists}
      />
    </div>
  );
}
