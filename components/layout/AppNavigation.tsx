import AuthButtons from './AuthButtons';
import MainAccountTab from './MainAccountTab';
import NavLinks from '@/components/layout/NavLinks';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default async function AppNavigation() {
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

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className="flex justify-center border-b-foreground/10 h-16 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex justify-between items-center p-3 text-sm">
        <NavLinks />
        <div className="flex">
          {' '}
          {!user && <AuthButtons />}
          {/* {isSupabaseConnected && <AuthButton />} */}
          {user && <MainAccountTab sessionUser={user} />}
        </div>
      </div>
    </nav>
  );
}
