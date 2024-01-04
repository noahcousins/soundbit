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

export default async function Handle() {
  const addArtistHandle = async (formData: FormData, session: Session) => {
    'use server';

    const handle = formData.get('handle') as string;

    if (handle) {
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
        { handle: handle, user_id: session?.user.id },
        { onConflict: 'user_id' } // Specify the conflict target
      );

      if (error) {
        console.error('Error adding artist handle:', error);
      } else {
        console.log('Artist handle added');
        const { error } = await supabase
          .from('users')
          .update({ is_onboarded: true })
          .eq('id', user?.id!);

        if (error) {
          console.error('Error updating user:', error);
        } else {
          console.log('User updated successfully');
        }
        redirect(`/${handle}`);
      }
    }
  };

  return (
    <div className="">
      <HandleInput onSubmit={addArtistHandle} />
    </div>
  );
}
