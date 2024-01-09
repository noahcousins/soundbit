import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function NextLayout({
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

    if (!site?.artist_id) {
      return null;
    } else {
      redirect(`/handle`);
    }

    return session;
  }

  const session = await fetchData();

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center overflow-x-hidden">
      {children}
    </div>
  );
}
