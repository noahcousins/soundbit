import AuthButtons from './AuthButtons';
import MainAccountTab from './MainAccountTab';
import NavLinks from '@/components/layout/NavLinks';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import MobileSidebar from '@/components/layout/MobileSidebar';

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

  let profileData = null;
  let userRoleData = null;

  if (user) {
    const profileQuery = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const userRoleQuery = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    profileData = profileQuery.data || null;
    userRoleData = userRoleQuery.data || null;
  }

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full justify-center border-b border-b-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full items-center justify-between p-3 text-sm">
        <div className="flex items-center lg:hidden">
          <MobileSidebar />
        </div>
        <Link className="hidden lg:flex" href="/">
          <Image
            alt="UAPoli logo"
            width={80}
            height={20.96}
            src="/uapoli_logo_nav.png"
          />
        </Link>
        <div className="hidden lg:flex">
          <NavLinks />
        </div>

        <Link className="visible lg:hidden" href="/">
          <Image
            alt="UAPoli logo"
            width={80}
            height={20.96}
            src="/uapoli_logo_nav.png"
          />
        </Link>
        <div className="flex">
          {!user && <AuthButtons />}
          {user && (
            <MainAccountTab
              userRole={userRoleData}
              profile={profileData}
              sessionUser={user}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
