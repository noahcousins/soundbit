import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CustomizeLayout({
  children
}: {
  children: React.ReactNode;
}) {
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
  async function fetchData() {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    let { data: site } = await supabase
      .from('sites')
      .select('artist_id, handle')
      .eq('user_id', session?.user.id)
      .single();

    if (!site) {
      redirect(`/welcome`);
    } else {
      return null;
    }

    return session; // Return session here
  }

  const session = await fetchData(); // Get the session

  return <div className="mx-auto flex">{children}</div>;
}
