import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

import Navigation from '@/src/components/layout/Navigation';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import Footer from '@/src/components/layout/Footer';

export default async function Custom404({
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
    <div className="flex h-screen w-full flex-col justify-between">
      <Navigation
        userRoleData={userRoleData}
        profileData={profileData}
        siteData={siteData}
        user={user}
      />
      <div className="flex w-full">
        <div className="flex w-full flex-col items-center justify-center space-y-8">
          <h1 className="font-grtsk-giga text-4xl font-bold">soundbit.</h1>
          <div className="flex flex-col items-center">
            <p className="text-2xl">Sorry, this page is not found.</p>
            <p className="text-base">
              If you think this is by mistake, please report the error here.
            </p>
          </div>
          <Link href={'/'}>
            <Button className="z-50 mx-auto w-fit scale-100 rounded-full bg-[#FF2E01] p-6 text-base font-normal text-white transition-transform duration-100 ease-in-out hover:scale-105 hover:bg-[#e00000] active:scale-100 active:bg-[#FF2E01]">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer siteData={siteData} />
    </div>
  );
}
