import AuthButtons from './AuthButtons';
import MainAccountTab from './MainAccountTab';
import NavLinks from '@/components/layout/NavLinks';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import MobileSidebar from '@/components/layout/MobileSidebar';

import UAPoliLogo from '../../public/uapoli-light.svg';

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

  const HeaderLogo = (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 97.78 24.18"
      {...props}
    >
      <defs>
        <style>
          {'.cls-1,.cls-2{fill:#7e22ce;stroke-width:0}.cls-2{fill:#fff}'}
        </style>
      </defs>
      <path
        d="M10.01 24.18C3.86 24.18 0 20.62 0 15.03V0h5.82v15.03c0 2.89 1.56 4.39 4.19 4.39s4.19-1.5 4.19-4.39V0h5.82v15.03c0 5.59-3.86 9.15-10.01 9.15ZM29.14.03h6.72l8.51 23.61h-5.95l-1.53-4.46h-8.81l-1.53 4.46h-5.92L29.14.03Zm6.19 14.53L32.5 6.28l-2.83 8.28h5.65ZM64.29 7.92c0 4.89-3.53 7.92-9.31 7.92h-3.96v7.82H45.2V.03h9.78c5.79 0 9.31 2.99 9.31 7.88Zm-9.71 3.16c2.36 0 3.79-1.06 3.79-3.16s-1.43-3.13-3.79-3.13h-3.56v6.29h3.56Z"
        className="cls-2"
      />
      <path
        d="M65.22 14.83c0-5.59 3.46-9.21 8.71-9.21s8.71 3.63 8.71 9.21-3.46 9.21-8.71 9.21-8.71-3.63-8.71-9.21Zm8.71 5.72c2.73 0 4.29-2.1 4.29-5.72s-1.56-5.72-4.29-5.72-4.29 2.1-4.29 5.72 1.56 5.72 4.29 5.72ZM89 .03v18.99c0 .83.43 1.26 1.23 1.26h1.36v3.36H89.1c-2.63 0-4.42-1.63-4.42-4.42V.03H89ZM97.72 6.02v17.63H93.4V6.02h4.32Z"
        className="cls-1"
      />
      <path d="M93.33.03h4.46v3.53h-4.46V.03Z" className="cls-2" />
    </svg>
  );

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full justify-center border-b border-b-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full items-center justify-between p-3 text-sm">
        <div className="flex items-center lg:hidden">
          <MobileSidebar />
        </div>
        <Link className="hidden lg:flex" href="/">
          <Image
            priority
            alt="UAPoli logo"
            width={80}
            height={20.96}
            src={UAPoliLogo}
          />
        </Link>
        <div className="hidden lg:flex">
          <NavLinks />
        </div>

        <Link className="visible lg:hidden" href="/">
          <Image
            priority
            alt="UAPoli logo"
            width={80}
            height={20.96}
            src={UAPoliLogo}
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
