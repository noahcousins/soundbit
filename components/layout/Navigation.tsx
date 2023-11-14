import AuthButtons from './AuthButtons';
import MainAccountTab from './MainAccountTab';
import NavLinks from '@/components/layout/NavLinks';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

// ... (import statements)

export default async function Navigation() {
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

  if (!user || !user.id) {
    // Handle the case where user or user.id is null
    return (
      <nav className="flex justify-center border-b-foreground/10 h-16 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex justify-between items-center p-3 text-sm">
          <Link href="/">
            <Image
              alt="UAPoli logo"
              width={80}
              height={20.96}
              src="/uapoli_logo_nav.png"
            />
          </Link>
          <NavLinks />
          <div className="flex">
            <AuthButtons />
          </div>
        </div>
      </nav>
    );
  }

  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const { data: userRoleData, error: userRoleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  return (
    <nav className="flex justify-center border-b-foreground/10 h-16 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex justify-between items-center p-3 text-sm">
        <Link href="/">
          <Image
            alt="UAPoli logo"
            width={80}
            height={20.96}
            src="/uapoli_logo_nav.png"
          />
        </Link>{' '}
        <NavLinks />
        <div className="flex">
          <MainAccountTab
            userRole={userRoleData}
            profile={profileData}
            sessionUser={user}
          />
        </div>
      </div>
    </nav>
  );
}
