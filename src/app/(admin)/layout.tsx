import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: any }) {
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

    if (!session) {
      redirect('/unauthenticated');
      return null;
    }

    let { data: user } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (user?.role !== 'admin') {
      redirect('/');
      return null;
    }

    return session;
  }

  const session = await fetchData();

  return (
    <div className="mx-auto flex w-full max-w-[1600px] px-2 md:px-4 lg:space-x-8 lg:px-8">
      <div className="flex w-full flex-col">
        <main className="px-2 md:px-4 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
