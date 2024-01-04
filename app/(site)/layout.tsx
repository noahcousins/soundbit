import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/layout/Navigation';
import Sidebar from '@/components/layout/Sidebar';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/layout/Footer';

export default async function SiteLayout({
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

  const {
    data: { user }
  } = await supabase.auth.getUser();

  let profileData = null;
  let userRoleData = null;
  let siteData = null;

  if (user) {
    const profileQuery = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const siteQuery = await supabase
      .from('sites')
      .select('handle')
      .eq('user_id', user.id)
      .single();

    const userRoleQuery = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    profileData = profileQuery.data || null;
    userRoleData = userRoleQuery.data || null;
    siteData = siteQuery.data || null;
  }

  return (
    <div className="flex w-full flex-col">
      <Navigation
        userRoleData={userRoleData}
        profileData={profileData}
        siteData={siteData}
        user={user}
      />
      <div className="flex w-full">{children}</div>
      <Footer siteData={siteData} />
    </div>
  );
}
