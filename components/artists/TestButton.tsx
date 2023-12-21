'use client';
import { createBrowserClient } from '@supabase/ssr';

import { Button } from '../ui/button';
import { Session } from '@supabase/supabase-js';

export default function TestButton({ session }: { session: any }) {
  const getBio = async () => {
    try {
      const res = await fetch(`/api/get-bio?artistId=50co4Is1HCEo8bhOyUWKpn`);

      if (!res.ok) {
        throw new Error('Failed to fetch bio');
      }

      const data = await res.json();
      console.log(data, 'bio');

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.from('sites').upsert(
        { artist_bio: data, user_id: session?.user.id },
        { onConflict: 'user_id' } // Specify the conflict target
      );

      if (error) {
        console.error('Error adding artist bio:', error);
      } else {
        console.log('Artist bio added');
      }
    } catch (error) {
      console.error('Error fetching bio:', error);
    }
  };

  return <Button onClick={getBio}>Click me for test</Button>;
}
